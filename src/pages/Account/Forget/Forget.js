import React, { useEffect, useRef, useState } from "react";
import "../account.css";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import keys from "../../../utils/keys.json";
import AuthService from "../../../services/auth/AuthService";
import { Oval } from "react-loader-spinner";
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";

export default function Forget() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState("");
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); // State pour la validation de l'email
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

  const validateEmail = (value) => {
    // Fonction de validation de l'email
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setIsValidEmail(isValid);
  };

  const handleSubmit = async () => {
    try {
      if (!isValidEmail) {
        // Vérifie si l'email ou le mot de passe n'est pas valide
        addToast("Please enter a valid email", {
          appearance: "warning",
          autoDismiss: true,
        });
        return; // Arrête la fonction de connexion si l'email ou le mot de passe n'est pas valide
      }
      setIsLoading(true); // Démarre le chargement
      await AuthService.forgetpassword({ email })
        .then((res) => {
          addToast("" + res?.msg, {
            appearance: "success",
            autoDismiss: true,
          });
          localStorage.setItem("email", email);
          setIsLoading(false); // Arrête le chargement après 3 secondes

          setTimeout(() => {
            navigate("/reset-verification"); // Passer l'e-mail comme état
          }, 2000);
        })
        .catch(() => {
          addToast("Verify Your Field", {
            appearance: "warning",
            autoDismiss: true,
          });
          setIsLoading(false);
        });
    } catch (error) {
      addToast("" + error, {
        appearance: "warning",
        autoDismiss: true,
      });
      setIsLoading(false);
    }
  };
  return (
    <React.Fragment>
      <div className={`container justify-content-center ${isMobile ? "w-100" : "w-50"} mt-5`}>
        <div className="col-lg-12 col-md-12 col-sm-12">
          <h1 className="title text-justify">Forgot password</h1>
          <p className="desc">Find your account</p>
          <div className="form-floating">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value); // Appelle la fonction de validation de l'email lorsqu'il change
              }}
              className="form-control"
              placeholder="Your Email"
            />
            <label htmlFor="email">Your Email</label>
          </div>
          <div className="mt-3"></div>
          <div className="hcaptcha-container">
            {isMobile ? (
              <HCaptcha
                custom={true}
                size="compact"
                sitekey={keys?.HCAPTCHA_SECRET_KEY}
                onLoad={onLoad}
                onVerify={setToken}
                ref={captchaRef}
              />
            ) : (
              <HCaptcha
                custom={true}
                size="normal"
                sitekey={keys?.HCAPTCHA_SECRET_KEY}
                onLoad={onLoad}
                onVerify={setToken}
                ref={captchaRef}
              />
            )}
          </div>
          <a className="text-primary" style={{ fontSize: 14 }} href="/account">
            <small>Remember Account ?</small>
          </a>
          {email === "" || !token ? (
            <button
              className="mt-3 w-100 btn btn-primary py-3 px-5 text-white"
              type="button"
              onClick={handleSubmit}
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
              onClick={handleSubmit}
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
      </div>
    </React.Fragment>
  );
}
