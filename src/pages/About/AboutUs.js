import GallerySection from "components/GallerySection/GallerySection";
import PageHeader from "components/HeaderSections/PageHeader";
import About from "components/Landing/About/About";
import Insights from "components/Landing/Insights/Insights";
import Team from "components/Landing/Staff/Team";
import WhyUS from "components/Landing/WhyUs/WhyUS";
import React from "react";

export default function AboutUs() {
  return (
    <div>
      <PageHeader title="About Us" home="Home" currentLink="About Us" />
      <About />
      <div className="container-fluid facts my-5 p-5">
        <Insights />
      </div>
      <WhyUS />
      <div className="mt-5"></div>
      <div className="container-fluid facts my-5 p-5">
        <GallerySection />
      </div>
      <div className="mt-5"></div>

      <Team />
    </div>
  );
}
