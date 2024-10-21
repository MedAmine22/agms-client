import React, { useEffect, useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import Slider from "react-slick";
import FeedbackService from "services/feedback/FeedbackService";

export default function Reviews() {
  const [sliderRef, setSliderRef] = useState(null);

  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    try {
      await FeedbackService.retrieveConfirmed().then((res) => {
        setRows(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [rows]);
  const settings = {
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="container">
      <div
        className="text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: "900px" }}
      >
        <p className="fw-medium text-uppercase text-primary mb-2">Testimonial</p>
        <h1 className="display-5 mb-5">What Our Clients Say!</h1>
      </div>
      <div
        style={{ position: "relative", zIndex: 999 }}
        className="d-flex justify-content-center align-items-center"
      >
        <ArrowBack
          onClick={sliderRef?.slickPrev}
          className="text-primary mx-3"
          style={{ cursor: "pointer", fontSize: 40 }}
        />

        <ArrowBack
          onClick={sliderRef?.slickNext}
          className="text-primary"
          style={{ cursor: "pointer", fontSize: 40, transform: "rotateY(180deg)" }}
        />
      </div>
      <div className="mt-3" style={{ position: "relative" }}>
        <Slider {...settings} ref={setSliderRef} style={{ zIndex: 0 }}>
          {rows.map((item) => (
            <div key={item._id}>
              <div className="testimonial-img position-relative">
                <img
                  style={{ height: 100, width: 100 }}
                  className="img-fluid rounded-circle mx-auto mb-5"
                  src={"https://www.ioi-jp.org/wp-content/themes/ioi/img/faceicon.png"}
                />
                <div className="btn-square bg-primary rounded-circle">
                  <i className="fa fa-quote-left text-white"></i>
                </div>
              </div>
              <div className="text-center testimonial-text rounded p-4">
                <div
                  className="d-block container"
                  style={{
                    fontSize: 13,
                    maxWidth: "300px", // Ajustez selon vos besoins
                    overflowWrap: "break-word", // Assure que les mots sont coupés à la fin de la ligne
                  }}
                >
                  {item.message}
                </div>{" "}
                <h5 className="mb-1">{item?.userId?.name}</h5>
                <span className="fst-italic">{item.role}</span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
