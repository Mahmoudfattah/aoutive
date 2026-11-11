import Navbar from "@/components/layout/Navbar";
import FeaturesTabsSection from "@/components/sections/FeaturesTabsSection";
import HeroSection from "@/components/sections/hero/HeroSection";
import InfrastructureSection from "@/components/sections/InfrastructureSection";
import { IntegrationsSection } from "@/components/sections/IntegrationsSection";
import  PricingSection from "@/components/sections/PricingSection";
import StatsSection from "@/components/sections/StatsSection";
import TrustedBySection from "@/components/sections/TrustedBySection";
import UseCasesSection from "@/components/sections/UseCasesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FCFCFC] text-[#1A1A1A]">
      <Navbar />
      <main>
        {/* السكشن الجاي: HeroSection */}
        {/* <SectionWrapper/> */}
        <HeroSection />
        <TrustedBySection />
        <FeaturesTabsSection />
        <InfrastructureSection />
        <UseCasesSection />
        <StatsSection />
        <IntegrationsSection />
        <PricingSection/>
      </main>
    </div>
  );
}
