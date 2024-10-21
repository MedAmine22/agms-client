import React, { useEffect, useState } from "react";
import URL_ from "../../../URL";
import CRMService from "services/crm/CRMService";

function WhyUS() {
  const [rows, setRows] = useState([]);
  const fetchData_Why = async () => {
    try {
      const response = await CRMService.fetchAll_WhyChooseUs(); // Appelez fetchAll sur l'objet
      setRows(response.data.data); // Accédez à la propriété data de la réponse
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    fetchData_Why();
  }, []);

  useEffect(() => {}, [rows]);
  return (
    <div className="container">
      {rows.map((item, index) => (
        <div key={index} className="row g-5 align-items-center">
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
            <div className="position-relative me-lg-4">
              <img className="img-fluid w-100" src={URL_.LOCAL_FILES + "/crm/" + item.image} />
              <span
                className="position-absolute top-50 start-100 translate-middle bg-white rounded-circle d-none d-lg-block"
                style={{ width: "120px", height: "120px" }}
              ></span>
              <button
                type="button"
                className="btn-play"
                data-bs-toggle="modal"
                data-src="#"
                data-bs-target="#videoModal"
              >
                <span></span>
              </button>
            </div>
          </div>
          <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
            <p className="fw-medium text-uppercase text-primary mb-2">Why Choosing Us!</p>
            <h1 className="display-5 mb-4">{item?.StrenghtsTitle}</h1>
            <p className="mb-4">{item?.StrenghtsDescription}</p>
            {item?.StrenghtsDetails.map((value) => (
              <div key={value} className="row gy-4">
                <div className="col-12 pt-5">
                  <div className="d-flex">
                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                      <i className="fa fa-check text-white"></i>
                    </div>

                    <div className="ms-4 pt-1">
                      <span style={{ fontSize: 18 }}>{value}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default WhyUS;
