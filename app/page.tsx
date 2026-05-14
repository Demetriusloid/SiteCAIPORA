import { HeroSection } from "@/components/sections/hero";
import { ProblemSection } from "@/components/sections/problem";
import { AmazonMapSection } from "@/components/sections/amazon-map";
import { SolutionSection } from "@/components/sections/solution";
import { MethodologySection } from "@/components/sections/methodology";
import { ResultsSection } from "@/components/sections/results";
import { TeamSection } from "@/components/sections/team";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSection />
      <AmazonMapSection />
      <SolutionSection />
      <MethodologySection />
      <ResultsSection />
      <TeamSection />
      <Footer />
    </main>
  );
}
