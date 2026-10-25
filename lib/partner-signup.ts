/**
 * The partner signup's shared vocabulary: the modal's choices and the API
 * route's validation read the same lists, so they can't drift.
 *
 * Hotels and resorts are in for staycations and day passes (one dated
 * visit fits how gifts are booked and collected today). Travel agencies,
 * flights and tours are not: changing prices, multi-day trips and
 * cancellations need a different product.
 */
export const PARTNER_TYPES = [
  { id: "restaurant", name: "Restaurant or kitchen", gifts: "Meals, dinner for two" },
  { id: "bakery", name: "Bakery or dessert maker", gifts: "Cakes, pastries, treat boxes" },
  { id: "spa", name: "Spa, salon or barber", gifts: "Massages, nails, grooming" },
  { id: "experience", name: "Cinema or experience", gifts: "Movie nights, paint & sip, games" },
  { id: "florist", name: "Florist or gift shop", gifts: "Flowers, keepsakes" },
  { id: "hamper", name: "Groceries or hampers", gifts: "Care packages, festive hampers" },
  { id: "hotel", name: "Hotel or resort", gifts: "Staycations, day passes" },
  { id: "other", name: "Something else", gifts: "Tell us what you offer" },
] as const;

export type PartnerTypeId = (typeof PARTNER_TYPES)[number]["id"];

export const HANDOVER_OPTIONS = [
  { id: "pickup", label: "Customers come to us" },
  { id: "delivery", label: "We deliver" },
  { id: "both", label: "Both" },
] as const;

export type HandoverId = (typeof HANDOVER_OPTIONS)[number]["id"];

export interface PartnerSignup {
  type: PartnerTypeId;
  businessName: string;
  area: string;
  offer: string;
  handover: HandoverId;
  contactName: string;
  whatsapp: string;
  email?: string;
  /** Honeypot: hidden from people. */
  website?: string;
}

export function partnerTypeName(id: string): string {
  return PARTNER_TYPES.find((t) => t.id === id)?.name ?? "Business";
}

export function handoverLabel(id: string): string {
  return HANDOVER_OPTIONS.find((h) => h.id === id)?.label ?? id;
}

/** The same details as a WhatsApp message, so the conversation starts with everything we need. */
export function partnerWhatsAppText(s: Omit<PartnerSignup, "website">): string {
  return [
    "Hi SendEbun, I'd like to become a partner.",
    "",
    `Business: ${s.businessName} (${partnerTypeName(s.type)})`,
    `Area: ${s.area}`,
    `What we'd offer: ${s.offer}`,
    `Handover: ${handoverLabel(s.handover)}`,
    `Contact: ${s.contactName}`,
  ].join("\n");
}
