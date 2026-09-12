import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const SKIP_PER_REFERRAL = 5;

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const { data: row, error } = await supabaseAdmin
    .from("waitlist")
    .select("id, queue_number")
    .eq("id", id)
    .single();

  if (error || !row) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const { count: referralCount } = await supabaseAdmin
    .from("waitlist")
    .select("*", { count: "exact", head: true })
    .eq("referred_by", id);

  const position = Math.max(1, row.queue_number - (referralCount ?? 0) * SKIP_PER_REFERRAL);

  return NextResponse.json({
    queueNumber: row.queue_number,
    referralCount: referralCount ?? 0,
    position,
  });
}