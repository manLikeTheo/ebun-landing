import { siInstagram, siWhatsapp, type SimpleIcon } from "simple-icons";
import { businessDetails } from "@/lib/business-details";
import { whatsAppChatUrl } from "@/lib/links";
import { cn } from "@/lib/utils";

/**
 * Social icon buttons. The glyphs come from simple-icons (official brand
 * marks, CC0) because lucide no longer ships brand icons — never hand-draw
 * a platform's logo. They're shown in one brand colour, which both
 * platforms' brand guidelines allow for glyphs.
 *
 * Add a platform by adding a handle to lib/business-details.ts and an
 * entry below. Only list accounts with posts worth sending people to.
 */
type Social = { label: string; href: string; icon: SimpleIcon };

function socials(): Social[] {
  const list: Social[] = [];
  if (businessDetails.phone) {
    list.push({ label: "Chat with SendEbun on WhatsApp", href: whatsAppChatUrl(), icon: siWhatsapp });
  }
  if (businessDetails.instagram) {
    list.push({
      label: `SendEbun on Instagram (@${businessDetails.instagram})`,
      href: `https://www.instagram.com/${businessDetails.instagram}/`,
      icon: siInstagram,
    });
  }
  return list;
}

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex list-none items-center gap-3", className)}>
      {socials().map((s) => (
        <li key={s.icon.slug}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${s.label} (opens in a new tab)`}
            title={s.label}
            className="group flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 text-gold transition-colors duration-300 hover:border-amber hover:bg-amber hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-light"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-[18px] w-[18px] fill-current">
              <path d={s.icon.path} />
            </svg>
          </a>
        </li>
      ))}
    </ul>
  );
}
