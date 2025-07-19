import Footer from "@/components/footer";
import CtaSection from "./cta.section";
import FeaturesShowcaseSection from "./feature.showcase.section";
import HeroSection from "./hero.section";

function LandingPage() {
  return (
    <>
      <main>
        <HeroSection />
        <FeaturesShowcaseSection />
        <CtaSection />
      </main>

      <Footer />
    </>
  );
}

export const Component = LandingPage;
