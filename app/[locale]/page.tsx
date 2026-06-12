import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandManifesto from "@/components/BrandManifesto";
import Problem from "@/components/Problem";
import DailyScenario from "@/components/DailyScenario";
import Solution from "@/components/Solution";
import HowItWorks from "@/components/HowItWorks";
import BeforeAfter from "@/components/BeforeAfter";
import Features from "@/components/Features";
import MeetLumi from "@/components/MeetLumi";
import WhyComeback from "@/components/WhyComeback";
import MoreThanApp from "@/components/MoreThanApp";
import PrivacyTrust from "@/components/PrivacyTrust";
import FoundersClub from "@/components/FoundersClub";
import WaitlistForm from "@/components/WaitlistForm";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <BrandManifesto />
      <Problem />
      <DailyScenario />
      <HowItWorks />
      <BeforeAfter />
      <Solution />
      <Features />
      <MeetLumi />
      <WhyComeback />
      <MoreThanApp />
      <PrivacyTrust />
      <FoundersClub />
      <WaitlistForm />
      <FAQ />
      <FinalCTA />
      <Footer />
    </main>
  );
}
