/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ReactCodeInput from "react-verification-code-input";
import "../account.css";
import AuthService from "../../../services/auth/AuthService"; // Importer la fonction verifyUser
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

export default function RegisterVerif({ email }) {
  const emailStored = localStorage.getItem("email");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { addToast } = useToasts();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleVerification = async (verificationCode) => {
    try {
      const response = await AuthService.verify(emailStored, verificationCode);
      addToast("" + response?.msg, {
        appearance: "success",
        autoDismiss: true,
      });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      addToast("" + error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {}, [email, emailStored]);

  return (
    <React.Fragment>
      <div className={`container justify-content-center ${isMobile ? "w-100" : "w-50"} mt-5`}>
        <div className="justify-content-center col-lg-12 col-md-12 col-sm-12">
          <h1 className="title text-justify mx-5 px-2">Verification Account</h1>
          <p className="desc mx-5 px-2">Put your code to verify your account</p>
          <p className="desc mx-5 px-2 text-primary">Email : {emailStored}</p>
          <div align="center">
            {!isMobile ? (
              <ReactCodeInput
                type="number"
                fieldHeight={100}
                fieldWidth={100}
                loading={false}
                required={true}
                fields={6}
                onComplete={handleVerification} // Appeler la fonction handleVerification lorsque le code est terminé
              />
            ) : (
              <ReactCodeInput
                type="text"
                fieldHeight={40}
                fieldWidth={40}
                loading={false}
                required={true}
                fields={6}
                onComplete={handleVerification} // Appeler la fonction handleVerification lorsque le code est terminé
              />
            )}
          </div>
          <br />
          <span className="signup-text mx-5 px-2">
            Code unrecieved ? &nbsp;
            <a style={{ textDecoration: "underline" }} href="/register" id="signup-form-toggler">
              Resend
            </a>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}
