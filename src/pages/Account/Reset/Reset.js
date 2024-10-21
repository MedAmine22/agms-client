import React, { useEffect, useRef, useState } from "react";
import "../account.css";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import keys from "../../../utils/keys.json";
export default function Reset() {
  const [token, setToken] = useState(null);
  const captchaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Set a threshold value for mobile
  const onLoad = () => {
    captchaRef.current.execute();
  };

  useEffect(() => {}, [token]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Update the state when the window is resized
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <React.Fragment>
      <div
        className={`container-fluid justify-content-center ${
          isMobile ? "w-100" : "w-50"
        } mt-5 w-75`}
      >
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="form-floating w-100">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Your Password"
            />
            <label htmlFor="email">Your Password</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Confirm Your Password"
            />
            <label htmlFor="email">Confirm Password</label>
          </div>
          <div className="mt-3"></div>
          <HCaptcha
            sitekey={keys?.HCAPTCHA_SECRET_KEY}
            onLoad={onLoad}
            onVerify={setToken}
            ref={captchaRef}
          />
          <button className="w-100 mt-3 btn btn-primary py-3 px-5 text-white" type="submit">
            Submit
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
