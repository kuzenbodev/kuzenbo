import { createPageMetadata } from "@/lib/seo/metadata";

import { CTASection } from "./_components/page/cta-section";
import { FeaturesSection } from "./_components/page/features-section";
import { HeroSection } from "./_components/page/hero-section";

export const metadata = createPageMetadata({
  title: "Build Your Design System",
  description:
    "Ship faster with Kuzenbo's production-ready design system components, patterns, and docs.",
  canonicalPath: "/",
  openGraphImagePath: "/opengraph-image",
  twitterImagePath: "/twitter-image",
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />

      <FeaturesSection />

      <CTASection />
    </div>
  );
}
