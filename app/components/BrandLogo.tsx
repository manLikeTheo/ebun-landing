import Image from "next/image";

/** Original supplied artwork, framed rather than recoloured or redrawn. */
/** tone="light" is for light backgrounds (redesigned header); "dark" keeps the old dark sections working. */
export default function BrandLogo({ tone = "dark" }: { tone?: "light" | "dark" }) {
  return (
    <span className="inline-flex shrink-0 items-center gap-2.5 whitespace-nowrap" aria-label="SendEbun">
      <span className="relative block h-10 w-10 shrink-0 overflow-hidden rounded-md bg-paper" aria-hidden="true">
        <Image
          src="/brand/sendebun-logo-original.png"
          alt=""
          width={1254}
          height={1254}
          sizes="114px"
          className="absolute left-[-93%] top-[-61%] h-auto w-[285%] max-w-none"
        />
      </span>
      <span
        className={`font-sans text-[1.35rem] font-bold leading-none tracking-[-0.04em] sm:text-[1.55rem] ${tone === "light" ? "text-forest" : "text-cream"}`}
        aria-hidden="true"
      >
        Send<span className={tone === "light" ? "text-sun" : "text-amber"}>Ebun</span>
      </span>
    </span>
  );
}
