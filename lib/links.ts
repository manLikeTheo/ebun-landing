import { businessDetails } from "./business-details";

/**
 * Where the landing page sends people into the product.
 *
 * NEXT_PUBLIC_ values are fixed at build time on Vercel: change one,
 * then redeploy.
 */
export const APP_URL = (process.env.NEXT_PUBLIC_APP_URL || "https://app.ebun.com.ng").replace(/\/+$/, "");

export const SEND_URL = `${APP_URL}/send`;

/**
 * Whether the public can send real gifts yet. Until Paystack is live,
 * "Send a gift" would take a stranger's card to a test checkout, so the
 * page keeps "Join Early Access" as its main button. Flip
 * NEXT_PUBLIC_APP_OPEN=true on Vercel (and redeploy) on launch day.
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
    "Hi SendEbun, I'd like to become a vendor.",
    "",
    "Business name: ",
    "Area / address: ",
    "What we sell: ",
  ].join("\n");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
