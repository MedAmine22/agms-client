/* eslint-disable react/prop-types */
import React from "react";
import URL from "../../../URL.js";
export default function ServiceItems({ rows }) {
  return (
    <div className="row gy-5 gx-4">
      {rows &&
        rows.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
            <div className="service-item">
              <img
                className="img-fluid"
                src={`${URL.LOCAL_FILES + "/services/" + item?.cover}`}
                alt=""
              />
              <div className="service-img">
                <img
                  className="img-fluid"
                  src={`${URL.LOCAL_FILES + "/services/" + item?.cover}`}
                  alt=""
                />
              </div>
              <div className="service-detail">
                <div className="service-title">
                  <hr className="w-25" />
                  <h3 className="mb-0">{item?.title}</h3>
                  <hr className="w-25" />
                </div>
                <div className="service-text">
                  <p className="text-white mb-0">{item?.description}</p>
                </div>
              </div>
              <a className="btn btn-light" href="">
                Read More
              </a>
            </div>
          </div>
        ))}
      ;
    </div>
  );
}
