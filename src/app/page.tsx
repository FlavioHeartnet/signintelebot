import React from "react";

import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductInfo } from "@/components/product_info";
import { About } from "@/components/about";
import { Pricing } from "@/components/pricing";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar isAuthenticated={false} />
      {/* Hero Section */}
      <Hero />
      {/* Service Section */}
      <ProductInfo />
      {/* about us Section */}
      <About />
      {/* Pricing Section */}
      <Pricing />
      <Footer />
    </div>
  );
};

export default LandingPage;
