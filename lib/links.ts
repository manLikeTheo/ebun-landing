import { businessDetails } from "./business-details";

/**
 * Where the landing page sends people into the product.
 *
 * NEXT_PUBLIC_ values are fixed at build time on Vercel: change one,
 * then redeploy.
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.ebun.com.ng").replace(/\/+$/, "");

/** UTM-tagged so the app's analytics can tell which button brought someone in. */
export function sendUrl(placement: "hero" | "navbar" | "footer" | "final_cta" | "weddings"): string {
  return `${APP_URL}/send?utm_source=landing&utm_medium=web&utm_content=${placement}`;
}

export const SEND_URL = sendUrl("hero");

/**
 * Whether the public can send real gifts yet. Until Paystack is live,
 * "Send a gift" would take a stranger's card to a test checkout, so the
 * page keeps "Join Early Access" as its main button.
 *
 * The page now also opens by itself at LAUNCH_AT (lib/launch.ts). This
 * flag remains the manual override: set NEXT_PUBLIC_APP_OPEN=true on
 * Vercel (and redeploy) to open early, or after launch so the very first
 * paint already shows the live buttons. Read it through useLaunched(),
 * never directly in a component.
 */
export const APP_OPEN = process.env.NEXT_PUBLIC_APP_OPEN === "true";

/**
 * "Become a vendor" opens a WhatsApp chat with SendEbun, the message
 * already written. While vendors are signed one by one, a conversation
 * converts better than a form — and it lands where the vendor's private
 * setup link is sent next anyway.
 */
export function vendorWhatsAppUrl(): string {
  const digits = businessDetails.phone.replace(/\D/g, "");
  const text = [
    "Hi SendEbun, I'd like to become a partner.",
    "",
    "Business name: ",
    "Area / address: ",
    "What we offer (food, pampering, experiences…): ",
  ].join("\n");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

/**
 * "Book a December campaign" opens an email to SendEbun, pre-filled with
 * what we need to quote. Email rather than WhatsApp: HR and procurement
 * buyers forward and file these, and need a trail for approvals.
 */
export function corporateEnquiryUrl(): string {
  const subject = "December gifting campaign — enquiry";
  const body = [
    "Hi SendEbun,",
    "",
    "We'd like to plan a gifting campaign for December.",
    "",
    "Company: ",
    "Number of people: ",
    "Budget per person (₦): ",
    "Preferred date: ",
    "Contact phone: ",
  ].join("\n");
  return `mailto:${businessDetails.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** General "chat with us" link for the footer, with a short greeting so the chat doesn't open empty. */
export function whatsAppChatUrl(): string {
  const digits = businessDetails.phone.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent("Hi SendEbun, I have a question.")}`;
}

/**
 * "Planning a wedding?" opens WhatsApp with the date asked for up front.
 * Registries aren't built: this collects dated demand without promising
 * a launch date.
 */
export function weddingInterestUrl(): string {
  const digits = businessDetails.phone.replace(/\D/g, "");
  const text = [
    "Hi SendEbun, we're planning a wedding and would love a gift registry.",
    "",
    "Wedding date: ",
    "City: ",
    "Rough number of guests: ",
  ].join("\n");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
