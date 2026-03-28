import { lazy, Suspense } from "react";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";

const Marquee = lazy(() => import("@/components/landing/Marquee").then(m => ({ default: m.Marquee })));
const ProblemSection = lazy(() => import("@/components/landing/ProblemSection").then(m => ({ default: m.ProblemSection })));
const SolutionSection = lazy(() => import("@/components/landing/SolutionSection").then(m => ({ default: m.SolutionSection })));
const CredibilitySection = lazy(() => import("@/components/landing/CredibilitySection").then(m => ({ default: m.CredibilitySection })));
const CTASection = lazy(() => import("@/components/landing/CTASection").then(m => ({ default: m.CTASection })));
const Footer = lazy(() => import("@/components/landing/Footer").then(m => ({ default: m.Footer })));
const FloatingWhatsApp = lazy(() => import("@/components/landing/FloatingWhatsApp").then(m => ({ default: m.FloatingWhatsApp })));

export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-background selection:bg-primary/30 text-foreground">
      <Navbar />
      <Hero />
      <Suspense>
        <Marquee />
        <ProblemSection />
        <SolutionSection />
        <CredibilitySection />
        <CTASection />
        <Footer />
        <FloatingWhatsApp />
      </Suspense>
    </main>
  );
}
