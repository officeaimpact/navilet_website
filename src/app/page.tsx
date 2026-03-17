import Navigation from "@/components/sections/Navigation";
import Hero from "@/components/sections/Hero";
import ProblemSolution from "@/components/sections/ProblemSolution";
import HowItWorks from "@/components/sections/HowItWorks";
import Features from "@/components/sections/Features";
import LiveDemo from "@/components/sections/LiveDemo";
import Technologies from "@/components/sections/Technologies";
import Metrics from "@/components/sections/Metrics";
import Partners from "@/components/sections/Partners";
import Events from "@/components/sections/Events";
import Audience from "@/components/sections/Audience";
import Pricing from "@/components/sections/Pricing";
import Integration from "@/components/sections/Integration";
import DashboardPromo from "@/components/sections/DashboardPromo";
import FAQ from "@/components/sections/FAQ";
import CallToAction from "@/components/sections/CallToAction";
import Footer from "@/components/sections/Footer";
import FloatingCTA from "@/components/ui/FloatingCTA";
import InlineCTA from "@/components/ui/InlineCTA";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProblemSolution />
        <InlineCTA
          text="Хотите перестать терять заявки?"
          buttonText="Подключить за 1 день"
        />
        <HowItWorks />
        <Features />
        <LiveDemo />
        <Technologies />
        <Metrics />
        <Partners />
        <Events />
        <Audience />
        <Pricing />
        <Integration />
        <DashboardPromo />
        <FAQ />
        <CallToAction />
      </main>
      <Footer />
      <FloatingCTA />
    </>
  );
}
