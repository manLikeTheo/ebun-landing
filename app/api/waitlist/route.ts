import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  try {
    const { whatsapp, email, hp } = await req.json();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    // Honeypot tripped — respond as if it worked, but never write the row.
    // Don't tip the bot off with an error; that just teaches it to adapt.
    if (hp) {
      const { count } = await supabaseAdmin
        .from("waitlist")
        .select("*", { count: "exact", head: true });
      return NextResponse.json({ queueNumber: (count ?? 0) + 1 });
    }

    const whatsappTrimmed = String(whatsapp || "").trim();
    if (!PHONE_PATTERN.test(whatsappTrimmed)) {
      return NextResponse.json({ error: "Invalid WhatsApp number" }, { status: 400 });
    }
    if (email && !EMAIL_PATTERN.test(String(email).trim())) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Basic IP throttle reusing the same table — no extra service required.
    // Not bulletproof (shared IPs/proxies can false-positive), but stops
    // straightforward bot hammering on this endpoint.
    const { count: recentCount } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", new Date(Date.now() - 60_000).toISOString());

    if ((recentCount ?? 0) >= 3) {
      return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
    }

    const { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert({ whatsapp: whatsappTrimmed, email: email || null, ip })
      .select("queue_number")
      .single();

    if (error) {
      if (error.code === "23505") {
        const { data: existing } = await supabaseAdmin
          .from("waitlist")
          .select("queue_number")
          .eq("whatsapp", whatsappTrimmed)
          .single();
        if (existing) return NextResponse.json({ queueNumber: existing.queue_number });
      }
      console.error(error);
      return NextResponse.json({ error: "Could not join waitlist" }, { status: 500 });
    }

    return NextResponse.json({ queueNumber: data.queue_number });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}