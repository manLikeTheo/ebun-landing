import { NextRequest, NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase-admin";

const ALLOWED_FIELDS = [
  "sender_type", "last_gift_timing", "how_text", "frustration_tags", "frustration_other",
  "defaulted_transfer", "feeling_text", "reveal_usecase", "group_coordination", "blockers_tags",
  "casual_spend", "milestone_spend", "fee_preference", "wishlist_text", "contact_whatsapp",
];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sessionId, completed } = body;
    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json({ error: "Missing sessionId" }, { status: 400 });
    }

    const payload: Record<string, unknown> = {
      session_id: sessionId,
      completed: !!completed,
      updated_at: new Date().toISOString(),
    };
    for (const field of ALLOWED_FIELDS) {
      if (field in body) payload[field] = typeof body[field] === "string" ? body[field].slice(0, 2000) : null;
    }

    const supabaseAdmin = getSupabaseAdmin();
    const { error } = await supabaseAdmin
      .from("validation_survey_responses")
      .upsert(payload, { onConflict: "session_id" });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: "Could not save" }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 });
  }
}