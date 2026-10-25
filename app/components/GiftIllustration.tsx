import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The hero's single object (Glovo-style): one gift box in the logo's own
 * green and amber, plus a voice-note chip — the two things SendEbun sends.
 *
 * Inline SVG, so it costs no request, stays crisp at any size and can be
 * recoloured from code. Decorative: the headline says what it means.
 */
function Sparkle({ x, y, s, className }: { x: number; y: number; s: number; className: string }) {
  return (
    <path
      className={className}
      d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s}Z`}
    />
  );
}

export default function GiftIllustration({ className }: { className?: string }) {
  return (
    <div className={cn("relative mx-auto w-full max-w-[540px]", className)} aria-hidden="true">
      <svg viewBox="0 0 560 520" className="h-auto w-full" role="presentation">
        {/* Warm sun behind the box */}
        <circle cx="290" cy="268" r="214" fill="#FFF1CC" />

        {/* Ground shadow (stays put while the box floats) */}
        <ellipse cx="292" cy="458" rx="150" ry="18" fill="#03452B" opacity="0.10" />

        <g className="ebun-float">
          {/* Box body: front + right side */}
          <rect x="160" y="270" width="220" height="170" rx="10" fill="#03452B" />
          <polygon points="380,270 430,245 430,412 380,440" fill="#022C1C" />
          {/* Ribbon around the body */}
          <rect x="252" y="270" width="36" height="170" fill="#FEA703" />
          <rect x="160" y="340" width="220" height="34" fill="#FEA703" />
          <polygon points="380,340 430,315 430,349 380,374" fill="#D98E00" />
          <rect x="252" y="340" width="36" height="34" fill="#FFB829" />

          {/* Lid: top, front, side */}
          <polygon points="145,222 197,196 449,196 397,222" fill="#13744C" />
          <rect x="145" y="222" width="252" height="58" rx="8" fill="#0A5C3D" />
          <polygon points="397,222 449,196 449,254 397,280" fill="#064A31" />
          {/* Lid shadow on the body */}
          <rect x="160" y="280" width="220" height="12" fill="#011F14" opacity="0.35" />
          {/* Ribbon over the lid */}
          <polygon points="249,222 301,196 343,196 291,222" fill="#FFC145" />
          <rect x="249" y="222" width="42" height="58" fill="#FEA703" />
          {/* Soft highlight on the lid edge */}
          <rect x="157" y="230" width="70" height="5" rx="2.5" fill="#FFFFFF" opacity="0.14" />

          {/* Bow */}
          <path d="M296 205 C 262 150, 205 160, 222 196 C 232 216, 270 214, 296 205 Z" fill="#FEA703" />
          <path d="M296 205 C 330 150, 387 160, 370 196 C 360 216, 322 214, 296 205 Z" fill="#FEA703" />
          <path d="M296 205 C 270 176, 242 176, 246 194 C 251 205, 275 207, 296 205 Z" fill="#D98E00" />
          <path d="M296 205 C 322 176, 350 176, 346 194 C 341 205, 317 207, 296 205 Z" fill="#D98E00" />
          <path d="M288 212 L 268 248 L 281 244 L 286 256 L 299 214 Z" fill="#E89A00" />
          <path d="M304 212 L 324 248 L 311 244 L 306 256 L 293 214 Z" fill="#E89A00" />
          <ellipse cx="296" cy="207" rx="15" ry="11" fill="#FFB829" />
        </g>

        {/* A few sparkles — no more */}
        <Sparkle x={118} y={176} s={18} className="fill-sun" />
        <Sparkle x={478} y={300} s={12} className="fill-forest" />
        <Sparkle x={128} y={372} s={10} className="fill-forest/60" />
        <circle cx="186" cy="118" r="5" className="fill-forest/70" />
        <circle cx="468" cy="404" r="7" className="fill-sun" />
      </svg>

      {/* Voice-note chip: the "your voice" half of the promise */}
      <div className="ebun-float-delayed absolute right-[2%] top-[9%] flex items-center gap-3 rounded-2xl bg-white py-2.5 pl-2.5 pr-4 shadow-[0_10px_30px_rgba(3,69,43,0.14)] ring-1 ring-forest/5 sm:right-[4%]">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-forest">
          <Play className="ml-0.5 h-4 w-4 fill-paper text-paper" strokeWidth={0} />
        </span>
        <span className="flex h-6 items-center gap-[3px]">
          {[10, 18, 12, 22, 14, 20, 9, 16, 11].map((h, i) => (
            <span key={i} className="w-[3px] rounded-full bg-forest/70" style={{ height: h }} />
          ))}
        </span>
        <span className="text-[0.8rem] font-semibold text-ink-text/70 [font-variant-numeric:tabular-nums]">0:24</span>
      </div>
    </div>
  );
}
