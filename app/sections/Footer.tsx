import Link from "next/link";
import BrandLogo from "../components/BrandLogo";
import { businessDetails } from "@/lib/business-details";
import SocialLinks from "../components/SocialLinks";

const footerLinks = [
  { label: "How it works", href: "#how" },
  { label: "Corporate · Booking December", href: "#corporate" },
  { label: "Become a Partner", href: "#vendors" },
  { label: "Contact", href: "#business-contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gold/20 bg-ink-deep px-6 py-12 md:px-[52px]">
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col items-start justify-between gap-7 border-b border-gold/20 pb-7 lg:flex-row lg:items-center">
          <div>
            <Link href="/" className="inline-flex no-underline"><BrandLogo /></Link>
            <p className="mt-3 text-sm text-muted-strong">Gift like you&rsquo;re there.</p>
            <SocialLinks className="mt-5" />
          </div>
          <ul className="flex list-none flex-wrap gap-x-6 gap-y-3">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="text-sm text-cream transition-colors hover:text-gold-light">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div id="business-contact" className="grid scroll-mt-28 gap-7 pt-7 text-sm leading-7 text-cream md:grid-cols-2">
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gold">The business behind SendEbun</p>
            <p>SendEbun is a product of {businessDetails.name}, registered in Nigeria.</p>
            <p className="text-muted-strong">Part of the iDICE Startup Bridge Founders Lab, Cohort 2.</p>
            {/* <p className="text-muted-strong">BN: {businessDetails.registrationNumber || "[CAC_BN_NUMBER]"}</p> */}
            <p className="mt-3 text-gold"><a href="https://ebun.com.ng">ebun.com.ng</a> · Nigeria</p>
          </div>
          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.16em] text-gold">Get in touch</p>
            <p>Email:  {businessDetails.email ? <a className="break-all underline underline-offset-4 hover:text-gold-light" href={`mailto:${businessDetails.email}`}>{businessDetails.email}</a> : <span className="text-muted-strong">[BUSINESS_EMAIL]</span>}</p>
            <p>Phone: {businessDetails.phone ? <a className="underline underline-offset-4 hover:text-gold-light" href={`tel:${businessDetails.phone.replace(/\s/g, "")}`}>{businessDetails.phone}</a> : <span className="text-muted-strong">[BUSINESS_PHONE]</span>}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
