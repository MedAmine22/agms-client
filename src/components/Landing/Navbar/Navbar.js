import { Circle, LogoutOutlined, Person2 } from "@mui/icons-material";
//import LanguageSelector from "components/LanguageSelector/LanguageSelector";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import CRMService from "services/crm/CRMService";
import URL from "../../../URL";

function Navbar() {
  const path = useLocation();
  const [isSticky, setIsSticky] = useState(false);
  const accessToken = localStorage.getItem("accessToken");
  const navigate = useNavigate();
  const { addToast } = useToasts();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await CRMService.fetchAll_Logo().then((res) => {
        setRows(res?.data);
      });
    };

    fetchData();
  }, []);

  useEffect(() => {}, [rows]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    // Ajouter un écouteur d'événement de défilement
    window.addEventListener("scroll", handleScroll);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    setTimeout(() => {
      addToast("You Have Logged Out. ", {
        autoDismiss: true,
        appearance: "success",
      });
    }, 2000);

    localStorage.clear();
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };
  return (
    <nav
      className={`py-0 pe-5 navbar navbar-expand-lg ${
        isSticky ? "fixed-top bg-white" : "bg-white navbar-light"
      }`}
    >
      {rows.map((item, index) => (
        <>
          {item.activate === true && (
            <a key={index} href="/" className="navbar-brand ps-5 me-0">
              <img width={200} src={`${URL.LOCAL_FILES + "/crm/" + item?.logo}`} />
            </a>
          )}
        </>
      ))}

      <button
        type="button"
        className="navbar-toggler me-0"
        data-bs-toggle="collapse"
        data-bs-target="#navbarCollapse"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarCollapse">
        {/* <div className=" mx-5" style={{ marginTop: -20 }}>
          <LanguageSelector />
        </div> */}
        <div className="navbar-nav ms-auto p-4 p-lg-0">
          {path.pathname === "/" ? (
            <a style={{ fontSize: 15 }} href="/" className="nav-item nav-link text-primary">
              <Circle style={{ fontSize: 12 }} /> Home
            </a>
          ) : (
            <a style={{ fontSize: 15 }} href="/" className="nav-item nav-link ">
              Home
            </a>
          )}
          {path.pathname === "/aboutus" ? (
            <a style={{ fontSize: 15 }} href="/aboutus" className="nav-item nav-link  text-primary">
              <Circle style={{ fontSize: 12 }} /> Abouts
            </a>
          ) : (
            <a style={{ fontSize: 15 }} href="/aboutus" className="nav-item nav-link">
              Abouts
            </a>
          )}
          {path.pathname === "/services" ? (
            <a
              style={{ fontSize: 15 }}
              href="/services"
              className="nav-item nav-link  text-primary"
            >
              <Circle style={{ fontSize: 12 }} /> Services
            </a>
          ) : (
            <a style={{ fontSize: 15 }} href="/services" className="nav-item nav-link">
              Services
            </a>
          )}
          {/*           <div className="nav-item dropdown">
           */}{" "}
          {path.pathname === "/projects" ? (
            <a style={{ fontSize: 15 }} href="/projects" className="nav-link nav-link text-primary">
              <Circle style={{ fontSize: 12 }} /> Projects
            </a>
          ) : (
            <a style={{ fontSize: 15 }} href="/projects" className="nav-link nav-link">
              Projects
            </a>
          )}
          {path.pathname === "/contact" ? (
            <a style={{ fontSize: 15 }} href="/contact" className="nav-link nav-link text-primary">
              <Circle style={{ fontSize: 12 }} /> Contact
            </a>
          ) : (
            <a style={{ fontSize: 15 }} href="/contact" className="nav-link nav-link">
              Contact
            </a>
          )}
          {accessToken !== null ? (
            <>
              <a
                style={{ fontSize: 15 }}
                href="/profile"
                className="nav-link nav-link text-primary"
              >
                <Person2 />
              </a>
              <a
                onClick={handleLogout}
                style={{ fontSize: 15 }}
                href="#"
                className="nav-link nav-link text-primary"
              >
                <LogoutOutlined />
              </a>
            </>
          ) : (
            <>
              {path.pathname === "/login" ? (
                <a
                  style={{ fontSize: 15 }}
                  href="/login"
                  className="nav-link nav-link text-primary"
                >
                  <Person2 />
                </a>
              ) : (
                <a style={{ fontSize: 15 }} href="/login" className="nav-link nav-link">
                  <Person2 />
                </a>
              )}
            </>
          )}
        </div>{" "}
        <a
          style={{
            borderRadius: 0,
            width: 160,
            height: 50,
            color: "whitesmoke",
            paddingTop: 12,
            fontWeight: "bold",
          }}
          href="/request-quote"
          className="btn btn-primary px-3 d-none d-lg-block"
        >
          Get A Quote
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
