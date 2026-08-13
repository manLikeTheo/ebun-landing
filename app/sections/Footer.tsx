"use client";

export default function Footer() {
  return (
    <footer className="py-12 px-6 md:px-[52px] border-t border-[rgba(201,168,76,0.07)] flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
        <span className="font-serif text-[1.2rem] font-medium tracking-[0.1em] text-gold">
          Ebun
        </span>
        <span className="text-[0.86rem] font-semibold tracking-wider text-gold-dark">
          The gift of giving, reimagined.
        </span>
      </div>

      <ul className="flex gap-6 list-none">
        {["How it works", "Corporate", "Become a Founding Vendor", "Contact"].map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[0.85rem] text-gold-dark no-underline tracking-[0.06em] transition-colors duration-300 hover:text-gold-light"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div className="text-[0.85rem] text-gold-dark">
        ebun.ng · Nigeria
      </div>
    </footer>
  );
}