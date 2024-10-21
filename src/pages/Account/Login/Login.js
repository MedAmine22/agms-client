/* eslint-disable react/no-unescaped-entities */
import React, { useEffect, useState } from "react";
import AuthService from "../../../services/auth/AuthService"; // Importer la fonction verifyUser
import { useToasts } from "react-toast-notifications";
import { useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true); // State pour la validation de l'email
  const [isValidPassword, setIsValidPassword] = useState(true);
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false); // State pour gérer le chargement

  const validateEmail = (value) => {
    // Fonction de validation de l'email
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setIsValidEmail(isValid);
  };

  const validatePassword = (value) => {
    // Fonction de validation du mot de passe
    const isValid = value.length != 0; // Vérifie si le mot de passe a au moins 6 caractères
    setIsValidPassword(isValid);
  };

  const handleLogin = async () => {
    try {
      if (!isValidEmail || !isValidPassword) {
        // Vérifie si l'email ou le mot de passe n'est pas valide
        addToast("Please enter a valid email and password", {
          appearance: "warning",
          autoDismiss: true,
        });
        return; // Arrête la fonction de connexion si l'email ou le mot de passe n'est pas valide
      }
      setIsLoading(true); // Démarre le chargement

      const credentials = { email, password };
      const { accessToken, refreshToken } = await AuthService.login(credentials);
      //  .then(() => {
      // Sauvegarde de l'accessToken et du refreshToken dans le stockage local
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      //localStorage.setItem("isUser", "Client");
      addToast("Logged successfuly", {
        autoDismiss: true,
        appearance: "success",
      });

      setTimeout(() => {
        setIsLoading(false); // Arrête le chargement après 3 secondes
        navigate("/");
      }, 1000);
      //    })
      /*    .catch(() => {
          addToast("Verify Your Fields", {
            autoDismiss: true,
            appearance: "warning",
          });
        });*/

      // Redirection vers une autre page après la connexion réussie
    } catch (error) {
      addToast("" + error?.msg, {
        autoDismiss: true,
        appearance: "error",
      });
      addToast("Internal Server Error, Try it Later", {
        autoDismiss: true,
        appearance: "error",
      });

      setIsLoading(false); // Arrête le chargement en cas d'erreur
    }
  };
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Set a threshold value for mobile

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
        <h1 className="title text-justify">Log In</h1>
        <p className="desc">Login to your account</p>
        <div className="form-floating">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(e.target.value); // Appelle la fonction de validation de l'email lorsqu'il change
            }}
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="Your Email"
          />
          <label htmlFor="email">Your Email</label>
        </div>
        <div className="form-floating mt-3">
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value); // Appelle la fonction de validation du mot de passe lorsqu'il change
            }}
            className="form-control"
            id="password"
            name="password"
            placeholder="Your Password"
          />
          <label htmlFor="email">Your Password</label>
        </div>
        <div className="mt-3"></div>
        <div className="mt-3 row">
          {isMobile ? (
            <React.Fragment>
              <div className="col-lg-6 col-md-8 col-sm-12 text-center">
                <span className="signup-text">
                  Don't have an account yet?{" "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href="/register"
                    id="signup-form-toggler"
                  >
                    Sign up
                  </a>
                </span>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-12 text-center">
                <span className="signup-text">
                  Don't remember your password{" "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href="/forgot"
                    id="signup-form-toggler"
                  >
                    Forget
                  </a>
                </span>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <div className="col-lg-6 col-md-8 col-sm-6 text-start">
                <span className="signup-text">
                  Don't have an account yet?{" "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href="/register"
                    id="signup-form-toggler"
                  >
                    Sign up
                  </a>
                </span>
              </div>
              <div className="col-lg-6 col-md-8 col-sm-6 text-end">
                <span className="signup-text">
                  Don't remember your password{" "}
                  <a
                    style={{ textDecoration: "underline" }}
                    href="/forgot"
                    id="signup-form-toggler"
                  >
                    Forget
                  </a>
                </span>
              </div>
            </React.Fragment>
          )}
        </div>

        {email === "" || password === "" ? (
          <button
            className="mt-3 w-100 btn btn-primary py-3 px-5 text-white"
            type="button"
            disabled={true}
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
              <span style={{ color: "white" }}>Sign in</span>
            )}{" "}
          </button>
        ) : (
          <button
            className="mt-3 w-100 btn btn-primary py-3 px-5 text-white"
            type="button"
            onClick={handleLogin}
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
              <span style={{ color: "white" }}>Sign In</span>
            )}{" "}
          </button>
        )}
      </div>
    </React.Fragment>
  );
}
