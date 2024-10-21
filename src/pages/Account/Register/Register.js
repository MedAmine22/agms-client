import React, { useEffect, useRef, useState } from "react";
import keys from "../../../utils/keys.json";
import HCaptcha from "@hcaptcha/react-hcaptcha";
import { useLocation, useNavigate } from "react-router-dom";
import AuthService from "../../../services/auth/AuthService";
import { useToasts } from "react-toast-notifications";
import { Oval } from "react-loader-spinner";
import RegisterVerif from "../Verification/RegisterVerif";

const EmailStored = (email) => {
  return <RegisterVerif email={email} />;
};

export default function Register() {
  const [token, setToken] = useState(null);
  const { addToast } = useToasts();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true); // State pour la validation de l'email
  const [sendEmail, setSendEmail] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: sendEmail,
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const validateEmail = (value) => {
    // Fonction de validation de l'email
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setIsValidEmail(isValid);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (name === "email") {
      validateEmail(value);
    }
  };

  const handleClick = async () => {
    // Check if passwords match
    try {
      if (user.password !== user.confirmPassword) {
        addToast("Passwords do not match.", {
          appearance: "warning",
          autoDismiss: true,
        });
        return;
      }

      setIsLoading(true); // Démarre le chargement

      // Create user object without confirmPassword

      await AuthService.register(user)
        .then((res) => {
          setSendEmail(user?.email);
          //EmailStored(user?.email);
          addToast("" + res?.msg, {
            appearance: "success",
            autoDismiss: true,
          });
          setSendEmail(user?.email);
          localStorage.setItem("email", user?.email);
          setIsLoading(false); // Arrête le chargement après 3 secondes

          setTimeout(() => {
            navigate("/account-verification"); // Passer l'e-mail comme état
          }, 2000);
        })
        .catch(() => {
          addToast("Verify Your Fields", {
            appearance: "warning",
            autoDismiss: true,
          });

          setIsLoading(false); // Arrête le chargement après 3 secondes
        });
      //console.log("user.email" + user?.email);
    } catch (error) {
      addToast("" + error, {
        appearance: "error",
        autoDismiss: true,
      });
      setIsLoading(false); // Arrête le chargement en cas d'erreur
    }
  };

  const captchaRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const onLoad = () => {
    captchaRef.current.execute();
  };

  useEffect(() => {}, [token]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [null]);

  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    setUser((prevUser) => ({
      ...prevUser,
      email: sendEmail,
    }));
  }, [sendEmail]); // Effect to update user email when sendEmail changes

  return (
    <React.Fragment>
      {isLoading ? (
        <>{EmailStored(user?.email)}</>
      ) : (
        <div className={`container justify-content-center ${isMobile ? "w-100" : "w-50"} mt-5`}>
          <h1 className="title">Signup</h1>
          <p className="desc">Create your account</p>
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              placeholder="Your Name"
              value={user.name}
              onChange={handleChange}
            />
            <label htmlFor="name">Your Name</label>
          </div>
          <div className="form-floating mt-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              placeholder="Your Email"
              value={user.email}
              onChange={handleChange}
            />
            <label htmlFor="email">Your Email</label>
            {!isValidEmail && <span style={{ color: "red", fontSize: "12px" }}>Invalid email</span>}
          </div>
          <div className="form-floating mt-3">
            <input
              type="text"
              className="form-control"
              id="phone"
              name="phone"
              placeholder="Your Email"
              value={user.phone}
              onChange={handleChange}
            />
            <label htmlFor="email">Your Phone</label>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="form-floating mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  placeholder="Your Password"
                  value={user.password}
                  onChange={handleChange}
                />
                <label htmlFor="password">Your Password</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="form-floating mt-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                  value={user.confirmPassword}
                  onChange={handleChange}
                />
                <label htmlFor="confirmPassword">Confirm Password</label>
                {user.password !== user.confirmPassword && (
                  <span style={{ color: "red", fontSize: "12px" }}>Password does not match</span>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3"></div>
          <HCaptcha
            sitekey={keys?.HCAPTCHA_SECRET_KEY}
            onLoad={onLoad}
            onVerify={setToken}
            ref={captchaRef}
          />
          <span className="signup-text">
            Already have an account?{" "}
            <a style={{ textDecoration: "underline" }} href="/login" id="login-form-toggler">
              Login
            </a>
          </span>
          {!token ||
          user.name === "" ||
          user.email === "" ||
          user.phone === "" ||
          user.password === "" ||
          user.confirmPassword === "" ||
          user.password !== user.confirmPassword ? (
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
                <span style={{ color: "white" }}>Create an account</span>
              )}{" "}
            </button>
          ) : (
            <button
              className="mt-3 w-100 btn btn-primary py-3 px-5 text-white"
              type="button"
              onClick={handleClick}
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
                <span style={{ color: "white" }}>Create an account</span>
              )}{" "}
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );
}
