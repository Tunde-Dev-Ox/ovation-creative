"use client";

import { useState } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatementSection from "@/components/StatementSection";
import ClientsSection from "@/components/ClientsSection";
import WhyUsSection from "@/components/WhyUsSection";
import ServicesSection from "@/components/ServicesSection";
import FAQSection from "@/components/FAQSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactModal from "@/components/ContactModal";

export default function Home() {
  const [isContactOpen, setContactOpen] = useState(false);

  return (
    <>
      <Header onOpenContact={() => setContactOpen(true)} />
      <main>
        <HeroSection onOpenContact={() => setContactOpen(true)} />
        <StatementSection />
        <ClientsSection onOpenContact={() => setContactOpen(true)} />
        <WhyUsSection onOpenContact={() => setContactOpen(true)} />
        <ServicesSection onOpenContact={() => setContactOpen(true)} />
        <FAQSection onOpenContact={() => setContactOpen(true)} />
        <TestimonialSection />
      </main>
      <ContactModal isOpen={isContactOpen} onClose={() => setContactOpen(false)} />
      <Footer onOpenContact={() => setContactOpen(true)} />
    </>
  );
}
