import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ResendClient = {
  emails: {
    send: (payload: Record<string, unknown>) => Promise<unknown>;
  };
};

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

async function sendWelcomeEmail(to: string, queueNumber: number) {
  if (!resend) return; // Not configured yet — skip silently, never blocks signup
  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Ebun <onboarding@resend.dev>",
      to,
      subject: "You're in — welcome to Ebun's early access",
      html: `<p>Hey,</p><p>You're officially <strong>Founding Sender No. ${queueNumber}</strong> on the Ebun waitlist.</p><p>We'll message you on WhatsApp the moment we launch. Thanks for being early.</p><p>— Theophilus, Founder</p>`,
    });
  } catch (err) {
    console.error("Welcome email failed (non-blocking):", err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const supabaseAdmin = getSupabaseAdmin();
    const { whatsapp, email, hp, ref } = await req.json();
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

    if (hp) {
      const { count } = await getSupabaseAdmin()
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

    const { count: recentCount } = await supabaseAdmin
      .from("waitlist")
      .select("*", { count: "exact", head: true })
      .eq("ip", ip)
      .gte("created_at", new Date(Date.now() - 60_000).toISOString());

    if ((recentCount ?? 0) >= 3) {
      return NextResponse.json({ error: "Too many attempts. Try again in a minute." }, { status: 429 });
    }

    const insertPayload: Record<string, unknown> = {
      whatsapp: whatsappTrimmed,
      email: email || null,
      ip,
    };
    if (ref && ref !== "undefined") insertPayload.referred_by = ref;

    let { data, error } = await supabaseAdmin
      .from("waitlist")
      .insert(insertPayload)
      .select("id, queue_number")
      .single();

    if (error?.code === "23503") {
      delete insertPayload.referred_by;
      ({ data, error } = await supabaseAdmin
        .from("waitlist")
        .insert(insertPayload)
        .select("id, queue_number")
        .single());
    }

    if (error) {
      if (error.code === "23505") {
        const { data: existing } = await supabaseAdmin
          .from("waitlist")
          .select("id, queue_number")
          .eq("whatsapp", whatsappTrimmed)
          .single();
        if (existing) return NextResponse.json({ id: existing.id, queueNumber: existing.queue_number });
      }
      console.error(error);
      return NextResponse.json({ error: "Could not join waitlist" }, { status: 500 });
    }

    if (!data) {
      console.error("Waitlist insert returned no data.", { error });
      return NextResponse.json({ error: "Could not join waitlist" }, { status: 500 });
    }

    if (email) sendWelcomeEmail(email, data.queue_number); // fire-and-forget, never awaited into the response

    return NextResponse.json({ id: data.id, queueNumber: data.queue_number });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}