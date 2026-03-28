import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Marquee } from "@/components/landing/Marquee";
import { ProblemSection } from "@/components/landing/ProblemSection";
import { SolutionSection } from "@/components/landing/SolutionSection";
import { CredibilitySection } from "@/components/landing/CredibilitySection";
import { CTASection } from "@/components/landing/CTASection";
import { Footer } from "@/components/landing/Footer";
import { FloatingWhatsApp } from "@/components/landing/FloatingWhatsApp";

export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary/30 text-foreground">
      <Navbar />
      <Hero />
      <Marquee />
      <ProblemSection />
      <SolutionSection />
      <CredibilitySection />
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
