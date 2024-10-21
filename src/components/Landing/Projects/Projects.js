/* eslint-disable no-useless-catch */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./custom.css";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import TitleLight from "./TitleLight";
import TitleDark from "./TitleDark";
import ProjectsService from "services/projects/ProjectsService";
import URL from "URL";

const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 4,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button className="custom-left-arrow" onClick={() => onClick()}>
      <ChevronLeft />
    </button>
  );
};

// Composant pour la flèche droite personnalisée
const CustomRightArrow = ({ onClick }) => {
  return (
    <button className="custom-right-arrow" onClick={() => onClick()}>
      <ChevronRight />
    </button>
  );
};

export default function Projects() {
  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    try {
      await ProjectsService.fetchAll().then((res) => {
        setRows(res.data);
      });
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [rows]);
  const path = useLocation();

  return (
    <div className="carousel-container">
      <div
        className="text-center mx-auto mt-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{ maxWidth: "600px" }}
      >
        <p className="fw-medium text-uppercase text-primary mb-2">Our Projects</p>
        {path.pathname === "/" ? <TitleLight /> : <TitleDark />}
      </div>
      <Carousel
        className="d-flex container project-carousel owl-carousel justify-content-center align-items-center"
        responsive={responsive2}
        arrows={true}
        infinite={true}
        keyBoardControl={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
      >
        {rows.map((item, index) => (
          <a key={index} className="project-item w-100" href="#">
            <img
              className="img-fluid"
              src={`${URL.LOCAL_FILES + "/projects/" + item?.cover}`}
              alt=""
            />
            <div className="project-title">
              <h5 className="text-light mb-0">{item.title}</h5>
            </div>
          </a>
        ))}
      </Carousel>
    </div>
  );
}
