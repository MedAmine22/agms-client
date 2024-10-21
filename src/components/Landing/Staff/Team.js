/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import AuthService from "services/auth/AuthService";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../Projects/custom.css";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 2,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
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

export default function Team() {
  const [rows1, setRows1] = useState([]);
  const [rows2, setRows2] = useState([]);

  useEffect(() => {
    const fetch1 = async () => {
      try {
        await AuthService.retrieveSA().then((res) => {
          setRows1(res);
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetch2 = async () => {
      try {
        await AuthService.retrieveA().then((res) => {
          setRows2(res);
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetch1();
    fetch2();
  }, []);
  return (
    <div className="container">
      <div
        className="text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: "600px" }}
      >
        <p className="fw-medium text-uppercase text-primary mb-2">Our Team</p>
        <h1 className="display-5 mb-5">Dedicated Team Members</h1>
      </div>
      <div className="row g-4">
        <div className="col-lg-4">
          {rows1.map((item) => (
            <div key={item._id} className="wow fadeInUp" data-wow-delay="0.1s">
              <div className="team-item">
                <img
                  className="img-fluid"
                  src={`https://www.oeesystems.com/wp-content/uploads/2023/03/two-heavy-industry-engineers-calculating-mtbf-in-manufactuing.jpg`}
                  alt=""
                />
                <div className="d-flex">
                  <div
                    className="flex-shrink-0 btn-square bg-primary"
                    style={{ width: "90px", height: "90px" }}
                  >
                    <i className="fa fa-2x fa-share text-white"></i>
                  </div>
                  <div
                    className="position-relative overflow-hidden bg-light d-flex flex-column justify-content-center w-100 ps-4"
                    style={{ height: "90px" }}
                  >
                    <h5>{item.name}</h5>
                    <span className="text-primary">CEO & Founder</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-8">
          <Carousel
            responsive={responsive2}
            className=""
            arrows={true}
            infinite={true}
            keyBoardControl={true}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
          >
            {rows2.map((item) => (
              <div key={item._id} className="col-lg-11 wow fadeInUp" data-wow-delay="0.3s">
                <div className="team-item">
                  <img
                    className="img-fluid"
                    src={`https://veriforce.com/wp-content/uploads/2023/12/Blog-Graphic-Safety-Technology-Advancements-960x640-1.jpg`}
                    alt=""
                  />
                  <div className="d-flex">
                    <div
                      className="flex-shrink-0 btn-square bg-primary"
                      style={{ width: "90px", height: "90px" }}
                    >
                      <i className="fa fa-2x fa-share text-white"></i>
                    </div>
                    <div
                      className="position-relative overflow-hidden bg-light d-flex flex-column justify-content-center w-100 ps-4"
                      style={{ height: "90px" }}
                    >
                      <h5>{item.fullname}</h5>
                      <span className="text-primary">{item.position}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
}
