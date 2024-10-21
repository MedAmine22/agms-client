import React, { useState, useEffect } from "react";
import CRMService from "../../../services/crm/CRMService";

export default function ContactInfo() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await CRMService.fetchAll_Contacts().then((res) => {
        setRows(res.data);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {}, [rows]);
  return (
    <div>
      <div className="row g-5 justify-content-center mb-5">
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
          <div className="bg-light text-center h-100 p-5">
            {rows.map((item, index) => (
              <React.Fragment key={index}>
                <div
                  className="btn-square bg-white rounded-circle mx-auto mb-4"
                  style={{ width: 90, height: 90 }}
                >
                  <i className="fa fa-phone-alt fa-2x text-primary"></i>
                </div>
                <h4 className="mb-3">Phone Number</h4>
                <p className="mb-2">
                  {item.phone.map((item) => (
                    <span key={item}>
                      {item} <br />
                      <br />
                    </span>
                  ))}
                </p>
                <a
                  className="btn btn-primary px-4"
                  target="_blank"
                  href={`phone:${item.phone.map((item) => item[0])}`}
                  rel="noreferrer"
                >
                  Call Now <i className="fa fa-arrow-right ms-2"></i>
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
          <div className="bg-light text-center h-100 p-5">
            {rows.map((item) => (
              <React.Fragment key={item?._id}>
                <div
                  className="btn-square bg-white rounded-circle mx-auto mb-4"
                  style={{ width: 90, height: 90 }}
                >
                  <i className="fa fa-envelope-open fa-2x text-primary"></i>
                </div>
                <h4 className="mb-3">Email Address</h4>
                <p className="mb-2">
                  {item.email.map((item) => (
                    <span key={item}>
                      {item} <br />
                      <br />
                    </span>
                  ))}
                </p>
                <a
                  className="btn btn-primary px-4"
                  target="_blank"
                  href={`mailto:${item.email.map((item) => item[0])}`}
                  rel="noreferrer"
                >
                  Email Now <i className="fa fa-arrow-right ms-2"></i>
                </a>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
          <div className="bg-light text-center h-100 p-5">
            {rows.map((item) => (
              <React.Fragment key={item?._id}>
                <div
                  className="btn-square bg-white rounded-circle mx-auto mb-4"
                  style={{ width: 90, height: 90 }}
                >
                  <i className="fa fa-map-marker-alt fa-2x text-primary"></i>
                </div>
                <h4 className="mb-3">Office Address</h4>
                <p className="mb-2">
                  {item.address.map((item) => (
                    <span key={item}>
                      {item} <br />
                      <br />
                    </span>
                  ))}
                </p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
