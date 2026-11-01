import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/hero/HeroSection";
import TrustedBySection from "@/components/sections/TrustedBySection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#1A1A1A]">
      <Navbar />
      <main>
        {/* السكشن الجاي: HeroSection */}
        {/* <SectionWrapper/> */}
        <HeroSection />
        <TrustedBySection />
        <HeroSection />
      </main>
    </div>
  );
}
