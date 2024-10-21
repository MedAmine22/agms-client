/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useRef, useState } from "react";
import ReactCodeInput from "react-verification-code-input";
import "../account.css";
import AuthService from "../../../services/auth/AuthService";
import { Oval } from "react-loader-spinner";
import { useToasts } from "react-toast-notifications";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import keys from "../../../utils/keys.json";
export default function ResetVerif() {
  const [token, setToken] = useState(null);
  useEffect(() => {}, [token]);
  const captchaRef = useRef(null);
  const onLoad = () => {
    captchaRef.current.execute();
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Set a threshold value for mobile
  const { addToast } = useToasts();
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [resetPasswordCode, setResetPasswordCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const storedEmail = localStorage.getItem("email");

  const handleResend = async () => {
    try {
      await AuthService.resendCode({
        email: storedEmail,
      }).then((res) => {
        addToast("" + res?.data?.msg, {
          appearance: "success",
          autoDismiss: true,
        });
      });
    } catch (error) {
      addToast("" + error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const handleResetPassword = async () => {
    setIsLoading(true);
    try {
      const response = await AuthService.resetpassword({
        email: storedEmail,
        resetPasswordCode,
        newPassword,
        confirmNewPassword,
      });
      addToast("" + response?.msg, {
        appearance: "success",
        autoDismiss: true,
      });
      // setMessage(response.data.msg);
      // Réinitialiser les champs après la réinitialisation du mot de passe
      setResetPasswordCode("");
      setNewPassword("");
      setConfirmNewPassword("");
      localStorage.clear();
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe :", error.response.data);
      addToast("" + error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    setIsLoading(false);
  };
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
      <div className={`container justify-content-center ${isMobile ? "w-100" : "w-50"} mt-5`}>
        <div className="justify-content-center col-lg-12 col-md-12 col-sm-12">
          <h1 className="title text-justify">Verification Account & Reset Password</h1>
          <p className="desc  ">Put your code to reset your password</p>
          <div align="center">
            {!isMobile ? (
              <ReactCodeInput
                type="number"
                fieldHeight={100}
                fieldWidth={123}
                loading={false}
                required={true}
                onChange={(code) => setResetPasswordCode(code)}
                value={resetPasswordCode}
                fields={6}
              />
            ) : (
              <ReactCodeInput
                type="number"
                fieldHeight={40}
                fieldWidth={40}
                loading={false}
                required={true}
                onChange={(code) => setResetPasswordCode(code)}
                value={resetPasswordCode}
                fields={6}
              />
            )}
          </div>
          <div className="col-lg-12 col-md-12 col-sm-12 mt-3">
            <div className="form-floating w-100">
              <input
                type="password"
                className="form-control"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Your Password"
              />

              <label htmlFor="email">Your Password</label>
            </div>
            <div className="form-floating mt-3">
              <input
                type="password"
                className="form-control"
                placeholder="Your Password"
                id="confirmNewPassword"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
            {!token ||
            resetPasswordCode === "" ||
            newPassword === "" ||
            confirmNewPassword === "" ? (
              <button
                className="mt-3 w-100 btn btn-primary py-3 px-5 text-white"
                type="button"
                onClick={handleResetPassword}
                disabled
                // Changed to type="button" and onClick
              >
                {isLoading ? (
                  <Oval
                    visible={true}
                    height="30"
                    width="30"
                    color="#fff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span style={{ color: "white" }}>Submit</span>
                )}{" "}
              </button>
            ) : (
              <button
                className="mt-3 w-100 btn btn-primary py-3 px-5 text-white"
                type="button"
                onClick={handleResetPassword}
                disabled={isLoading}
                // Changed to type="button" and onClick
              >
                {isLoading ? (
                  <Oval
                    visible={true}
                    height="30"
                    width="30"
                    color="#fff"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                ) : (
                  <span style={{ color: "white" }}>Submit</span>
                )}{" "}
              </button>
            )}
          </div>
          <br />
          <span className="signup-text">
            Code unrecieved ? &nbsp;
            <a
              style={{ textDecoration: "underline" }}
              href="#resend"
              onClick={handleResend}
              id="signup-form-toggler"
            >
              Resend
            </a>
          </span>
        </div>
      </div>
    </React.Fragment>
  );
}
