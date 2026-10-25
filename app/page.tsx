import type { Metadata } from "next";
import Navbar from "./components/Navbar";
import Divider from "./components/Divider";
import Hero from "./sections/Hero";
import MarqueeStrip from "./sections/MarqueeStrip";
import Problem from "./sections/Problem";
import HowItWorks from "./sections/HowItWorks";
import Categories from "./sections/Categories";
import Diaspora from "./sections/Diaspora";
import Scenarios from "./sections/Scenarios";
import Weddings from "./sections/Weddings";
import Corporate from "./sections/Corporate";
import ForVendors from "./sections/ForVendors";
import Trust from "./sections/Trust";
import Faq from "./sections/Faq";
import EarlyAccess from "./sections/EarlyAccess";
import Footer from "./sections/Footer";
import { WaitlistModalProvider } from "./context/WaitlistModalContext";
import WaitlistModal from "./components/WaitlistModal";
import { PartnerModalProvider } from "./context/PartnerModalContext";
import PartnerModal from "./components/PartnerModal";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://ebun.com.ng",
  },
};

export default function Home() {
  return (
    <WaitlistModalProvider>
      <PartnerModalProvider>
      <Navbar />

      <main>
        <Hero />
        {/* <MarqueeStrip /> */}
        <Problem />
        <Divider />
        <HowItWorks />
        <Divider />
        <Categories />
        <Divider />
        <Diaspora />
        <Divider />
        <Scenarios />
        <Weddings />
        <Corporate />
        <ForVendors />
        <Divider />
        <Trust />
        <Divider />
        <Faq />
        <Divider />
        <EarlyAccess />
      </main>

      <Footer />
      <WaitlistModal />
      <PartnerModal />
      </PartnerModalProvider>
    </WaitlistModalProvider>
  );
}
