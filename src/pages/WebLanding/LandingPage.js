/* eslint-disable react/prop-types */
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./carousel.css";
import Header from "components/Landing/Header/Header";
import About from "components/Landing/About/About";
import WhyUS from "components/Landing/WhyUs/WhyUS";
import Services from "components/Landing/Services/Services";
import Insights from "components/Landing/Insights/Insights";
import Projects from "components/Landing/Projects/Projects";
import Team from "components/Landing/Staff/Team";
import Reviews from "components/Landing/Testimonials/Reviews";
import Partners from "components/Landing/Partners/Partners";

export default function LandingPage() {
  return (
    <React.Fragment>
      <div className="container-fluid px-0 mb-5">
        <Header />
      </div>

      <div className="container-xxl py-5">
        <About />
      </div>

      <div className="container-fluid facts my-5 p-5">
        <Insights />
      </div>

      <div className="container-xxl py-5">
        <WhyUS />
      </div>

      <div className="container-xxl py-5">
        <Services />
      </div>

      <div className="container-fluid d-block justify-content-center align-items-center bg-dark pt-5 my-5 px-0">
        <Projects />
      </div>

      <div className="container-xxl py-5">
        <Team />
      </div>

      <div className="container-xxl py-5">
        <Reviews />
      </div>
      <div className="container-xxl py-5">
        <Partners />
      </div>
    </React.Fragment>
  );
}
