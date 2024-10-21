/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from "react";
import "./account.css";
import Login1 from "../../assets/img/about-1.jpg";
import Register from "./Register/Register";
import Login from "./Login/Login";
export default function Account() {
  const [bannerTransform, setBannerTransform] = useState("translateX(0%)");
  const [loginTransform, setLoginTransform] = useState("scale(1)");
  const [signupTransform, setSignupTransform] = useState("scale(0)");

  const handleSignupToggle = () => {
    setBannerTransform("translateX(-100%)");
    setLoginTransform("scale(0)");
    setSignupTransform("scale(1)");
  };

  const handleLoginToggle = () => {
    setBannerTransform("translateX(0%)");
    setLoginTransform("scale(1)");
    setSignupTransform("scale(0)");
  };

  return (
    <div className=" container form-container row mt-3">
      <div
        style={{ transform: loginTransform }}
        className=" login-container col-lg-6 col-md-10 col-sm-12"
        id="login-container"
      >
        <Login />
        <span className="signup-text">
          Don't have an account yet?{" "}
          <a onClick={handleSignupToggle} id="signup-form-toggler">
            Sign up
          </a>
        </span>
      </div>
      <div
        style={{ transform: bannerTransform }}
        className="placeholder-banner col-lg-6 col-md-10 col-sm-12"
        id="banner"
      >
        <img src={Login1} alt="" className="banner" />
      </div>
      <div
        style={{ transform: signupTransform }}
        className="signup-container col-lg-6 col-md-10 col-sm-12"
        id="signup-container"
      >
        <Register />
        <span className="signup-text">
          Already have an account?{" "}
          <a onClick={handleLoginToggle} id="login-form-toggler">
            Login here
          </a>
        </span>
      </div>
    </div>
  );
}
