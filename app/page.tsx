import CustomCursor from "./components/CustomCursor";
import NoiseOverlay from "./components/NoiseOverlay";
import Navbar from "./components/Navbar";
import Divider from "./components/Divider";
import Hero from "./sections/Hero";
import MarqueeStrip from "./sections/MarqueeStrip";
import Problem from "./sections/Problem";
import HowItWorks from "./sections/HowItWorks";
import Categories from "./sections/Categories";
import Diaspora from "./sections/Diaspora";
import Scenarios from "./sections/Scenarios";
import Corporate from "./sections/Corporate";
import Trust from "./sections/Trust";
import EarlyAccess from "./sections/EarlyAccess";
import Footer from "./sections/Footer";
import { WaitlistModalProvider } from "./context/WaitlistModalContext";
import WaitlistModal from "./components/WaitlistModal";

export default function Home() {
  return (
    <WaitlistModalProvider>
      <CustomCursor />
      <NoiseOverlay />
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
        <Corporate />
        <Divider />
        <Trust />
        <Divider />
        <EarlyAccess />
      </main>

      <Footer />
      <WaitlistModal />
    </WaitlistModalProvider>
  );
}