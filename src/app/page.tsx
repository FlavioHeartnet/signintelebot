import React from "react";

import Footer from "@/components/footer";
import { NavBar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { ProductInfo } from "@/components/product_info";
import { About } from "@/components/about";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <NavBar />

      {/* Hero Section */}
      <Hero />
      {/* Service Section */}
      <ProductInfo />
      {/* about us Section */}
      <About />
      {/* Pricing Section */}

      <Footer />
    </div>
  );
};

export default LandingPage;
