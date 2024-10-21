import { ArrowUpward } from "@mui/icons-material";
import { CancelQuote } from "components/Landing/Profile/CancelQuote";
import { Profile } from "pages/Profile/Profile";
import React, { useEffect, Suspense, lazy } from "react";
import { Oval } from "react-loader-spinner";

// react-router components
import { Routes, Route, useLocation } from "react-router-dom";

//import Presentation from "layouts/pages/presentation";

const LandingPage = lazy(() => import("pages/WebLanding/LandingPage"));
const AboutUs = lazy(() => import("pages/About/AboutUs"));
const Navbar = lazy(() => import("components/Landing/Navbar/Navbar"));
const Footer = lazy(() => import("components/Landing/Footer/Footer"));
const TopBar = lazy(() => import("components/Landing/TopBar/TopBar"));
const Copyright = lazy(() => import("components/Landing/Footer/Copyright/Copyright"));
const Contact = lazy(() => import("pages/Contact/Contact"));
const Projects_ = lazy(() => import("pages/Projects/Projects_"));
const Services_ = lazy(() => import("pages/Services/Services_"));
const Forget = lazy(() => import("pages/Account/Forget/Forget"));
const RegisterVerif = lazy(() => import("pages/Account/Verification/RegisterVerif"));
const ResetVerif = lazy(() => import("pages/Account/Verification/ResetVerif"));
const Register = lazy(() => import("pages/Account/Register/Register"));
const Login = lazy(() => import("pages/Account/Login/Login"));
const Quote = lazy(() => import("pages/Quote/Quote"));
const LeaveReview = lazy(() => import("pages/Feedback/LeaveReview"));

import { ToastProvider } from "react-toast-notifications";

export default function App() {
  const { pathname } = useLocation();

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    //document.scrollingElement.scrollTop = 280;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  return (
    <React.Fragment>
      <Suspense
        fallback={
          <div
            style={{ marginTop: "30%" }}
            className="d-flex justify-content-center align-items-center text-center"
          >
            <Oval
              visible={true}
              height="90"
              width="90"
              color=" yellow"
              ariaLabel="oval-loading"
              wrapperStyle={{}}
              wrapperClass="d-flex justify-content-center align-items-center"
            />
          </div>
        }
      >
        <TopBar />
        <ToastProvider>
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/aboutus" element={<AboutUs />} />
            <Route path="/services" element={<Services_ />} />
            <Route path="/projects" element={<Projects_ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/account-verification" element={<RegisterVerif />} />
            <Route path="/forgot" element={<Forget />} />
            <Route path="/reset-verification" element={<ResetVerif />} />
            <Route path="/request-quote" element={<Quote />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cancel-quote/:id" element={<CancelQuote />} />
            <Route path="/leave-request" element={<LeaveReview />} />
          </Routes>
          <div
            className="container-fluid bg-dark footer mt-5 py-5 wow fadeIn"
            data-wow-delay="0.1s"
          >
            <Footer />
          </div>

          <div className="container-fluid copyright bg-dark py-4">
            <Copyright />
          </div>
          <a
            href="#"
            className="text-light  bg-primary btn-lg btn-lg-square rounded-circle back-to-top"
          >
            <ArrowUpward />
          </a>
        </ToastProvider>
      </Suspense>
    </React.Fragment>
  );
}
