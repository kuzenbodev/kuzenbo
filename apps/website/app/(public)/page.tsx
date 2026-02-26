import { CTASection } from "./_components/page/cta-section";
import { FeaturesSection } from "./_components/page/features-section";
import { HeroSection } from "./_components/page/hero-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <FeaturesSection />

      <CTASection />
    </div>
  );
}
