import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "../brand/tokens.css";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ebun.com.ng"),
  title: "SendEbun — Digital Gifting in Nigeria | TadecLabs Innovations",
  description:
    "SendEbun is a digital gifting platform by TadecLabs Innovations, registered in Nigeria. Join early access for thoughtful gifts with personal messages.",
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "SendEbun",
    title: "SendEbun — Digital Gifting in Nigeria | TadecLabs Innovations",
    description:
      "SendEbun is a digital gifting platform by TadecLabs Innovations, registered in Nigeria. Join early access for thoughtful gifts with personal messages.",
  },
  twitter: {
    card: "summary",
    title: "SendEbun — Digital Gifting in Nigeria | TadecLabs Innovations",
    description:
      "SendEbun is a digital gifting platform by TadecLabs Innovations, registered in Nigeria. Join early access for thoughtful gifts with personal messages.",
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
      </body>
    </html>
  );
}
