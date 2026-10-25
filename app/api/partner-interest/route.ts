import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { businessDetails } from "@/lib/business-details";
import {
  HANDOVER_OPTIONS,
  PARTNER_TYPES,
  handoverLabel,
  partnerTypeName,
} from "@/lib/partner-signup";

const PHONE_PATTERN = /^\+[1-9]\d{7,14}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Best-effort per-IP limit. Serverless instances don't share memory, so
 * this only slows a single noisy client; the honeypot and the fact that
 * all this does is send SendEbun an email keep the stakes low.
 */
const recent = new Map<string, number[]>();
function tooMany(ip: string): boolean {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < 60 * 60_000);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > 5;
}

function text(value: unknown, max: number): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim().slice(0, max) : "";
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/**
 * A business asked to become a partner from the landing page. Emails the
 * details to SendEbun (PARTNER_LEADS_EMAIL, else the business address).
 * No database: the partner is set up by hand in /ops after a chat, and
 * the person is also offered the same details as a WhatsApp message.
 */
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Record<string, unknown>;
    if (text(body.website, 200)) return NextResponse.json({ ok: true });

    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (tooMany(ip)) {
      return NextResponse.json({ error: "Too many tries. Please message us on WhatsApp instead." }, { status: 429 });
    }

    const type = text(body.type, 20);
    const handover = text(body.handover, 20);
    const businessName = text(body.businessName, 120);
    const area = text(body.area, 120);
    const offer = text(body.offer, 600);
    const contactName = text(body.contactName, 120);
    const whatsapp = text(body.whatsapp, 20).replace(/[^\d+]/g, "");
    const email = text(body.email, 200);

    if (!PARTNER_TYPES.some((t) => t.id === type)) {
      return NextResponse.json({ error: "Choose what kind of business you run." }, { status: 400 });
    }
    if (!HANDOVER_OPTIONS.some((h) => h.id === handover)) {
      return NextResponse.json({ error: "Tell us how customers get their order." }, { status: 400 });
    }
    if (businessName.length < 2 || area.length < 2 || offer.length < 3 || contactName.length < 2) {
      return NextResponse.json({ error: "Please fill in every field." }, { status: 400 });
    }
    if (!PHONE_PATTERN.test(whatsapp)) {
      return NextResponse.json({ error: "Enter a WhatsApp number with the country code, e.g. +2348031234567." }, { status: 400 });
    }
    if (email && !EMAIL_PATTERN.test(email)) {
      return NextResponse.json({ error: "That email address doesn't look right." }, { status: 400 });
    }

    const rows: [string, string][] = [
      ["Business", businessName],
      ["Type", partnerTypeName(type)],
      ["Area", area],
      ["Would offer", offer],
      ["Handover", handoverLabel(handover)],
      ["Contact", contactName],
      ["WhatsApp", whatsapp],
      ["Email", email || "—"],
    ];

    if (!resend) {
      console.warn("Partner signup received but RESEND_API_KEY is not set:", JSON.stringify(Object.fromEntries(rows)));
      return NextResponse.json({ ok: true });
    }

    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "SendEbun <onboarding@resend.dev>",
      to: process.env.PARTNER_LEADS_EMAIL || businessDetails.email,
      ...(email ? { replyTo: email } : {}),
      subject: `New partner: ${businessName} (${partnerTypeName(type)}, ${area})`,
      html: `<p>A business asked to become a SendEbun partner from the landing page.</p><table cellpadding="6">${rows
        .map(([k, v]) => `<tr><td><strong>${escapeHtml(k)}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join("")}</table><p><a href="https://wa.me/${whatsapp.replace(/\D/g, "")}">Reply on WhatsApp</a> — they were told to expect a message within a day.</p>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Partner signup failed:", err);
    return NextResponse.json({ error: "We couldn't send that just now. Please message us on WhatsApp instead." }, { status: 500 });
  }
}
