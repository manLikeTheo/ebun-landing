import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../brand/tokens.css";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Title leads with the tagline: this is what WhatsApp and Instagram show
// when someone shares the link. The legal name stays in the description
// (and the footer) for business verification.
const TITLE = "SendEbun — Gift like you're there";
const DESCRIPTION =
  "Send a real gift — a meal, a cake, a spa afternoon, a cinema night — with a video or voice note from you. They scratch to reveal it, then collect it. A product of TadecLabs Innovations, registered in Nigeria.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ebun.com.ng"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "SendEbun",
    url: "https://ebun.com.ng",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "SendEbun — Gift like you're there" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        {/* Page views only, no cookies. Turn on Web Analytics in the Vercel project for data to appear. */}
        <Analytics />
      </body>
    </html>
  );
}
