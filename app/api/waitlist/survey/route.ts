import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const VALID_SEGMENT = ["Nigeria", "Abroad (diaspora)"];
const VALID_FRUSTRATION = ["Bank transfer felt easier", "Vendors felt unreliable", "Too far to coordinate", "Never really tried"];
const VALID_OCCASION = ["Birthday", "Wedding", "Anniversary", "Just because"];

export async function POST(req: NextRequest) {
  try {
    const { waitlistId, segment, frustration, occasion } = await req.json();
    if (!waitlistId) return NextResponse.json({ error: "Missing waitlistId" }, { status: 400 });
    if (!VALID_SEGMENT.includes(segment) || !VALID_FRUSTRATION.includes(frustration) || !VALID_OCCASION.includes(occasion)) {
      return NextResponse.json({ error: "Invalid answer" }, { status: 400 });
    }

    const supabaseAdmin = getSupabaseAdmin();

    const { error } = await supabaseAdmin
      .from("survey_responses")
      .upsert({ waitlist_id: waitlistId, segment, frustration, occasion }, { onConflict: "waitlist_id" });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Could not save response" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}