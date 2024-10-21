/* eslint-disable react/prop-types */
import React from "react";
import CarouselItem1 from "../../../assets/img/carousel-1.jpg";
import CarouselItem2 from "../../../assets/img/carousel-2.jpg";
import Carousel from "react-multi-carousel";

const responsive2 = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
function Header() {
  return (
    <Carousel
      infinite={true}
      className="d-flex carousel-height carousel-inner carousel-global-height"
      responsive={responsive2}
    >
      <div>
        <img className="w-100" src={CarouselItem1} alt="Image" />
        <div className="carousel-header carousel-caption">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 text-start">
                <p className="fs-5 fw-medium text-light text-uppercase animated slideInRight">
                  25 Years of Working Experience
                </p>
                <h1 className="display-1 text-white mb-5 animated slideInRight">
                  Industrial Solution Providing Company
                </h1>
                <a href="" className="btn btn-primary text-white py-3 px-5 animated slideInRight">
                  Explore More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <img className="w-100" src={CarouselItem2} alt="Image" />
        <div className="carousel-header carousel-caption">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-10 text-start">
                <p className="fs-5 fw-medium text-light text-uppercase animated slideInRight">
                  25 Years of Working Experience
                </p>
                <h1 className="display-1 text-white mb-5 animated slideInRight">
                  The Best Reliable Industry Solution
                </h1>
                <a href="" className="btn btn-primary py-3 px-5 animated slideInRight">
                  Explore More
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}

export default Header;
