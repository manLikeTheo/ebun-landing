"use client";

const footerLinks = [
  { label: "How it works", href: "#how" },
  { label: "Corporate", href: "#corporate" },
  { label: "Become a Founding Vendor", href: "#" }, // TODO: real destination pending
  { label: "Contact", href: "#" }, // TODO: real destination pending
];


export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-[52px] border-t border-[rgba(226,192,122,0.14)] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
        {/* <span className="font-serif text-[1.2rem] font-medium tracking-[0.1em] text-gold">
          Ebun
        </span> */}
        <a href="https://ebun.com.ng" target="_blank" rel="noopener noreferrer" className="font-serif text-[1.2rem] font-medium tracking-[0.1em] text-gold hover:text-gold-light transition-colors duration-300">
         Ebun
       </a>
        <span className="text-[0.86rem] font-semibold tracking-wider text-gold-dark">
          The gift of giving, reimagined.
        </span>
      </div>

      <ul className="flex gap-6 list-none">
        {footerLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="text-[0.85rem] text-gold-dark no-underline tracking-[0.06em] transition-colors duration-300 hover:text-gold-light"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="text-[0.85rem] text-gold-dark">
       <a href="https://ebun.com.ng" target="_blank" rel="noopener noreferrer">
         ebun.com.ng
       </a>
       · Nigeria
      </div>
    </footer>
  );
}