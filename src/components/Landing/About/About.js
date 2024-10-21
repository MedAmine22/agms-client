import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import URL_ from "../../../URL.js";
import CRMService from "../../../services/crm/CRMService";

export default function About() {
  const [rows, setRows] = useState([null]);
  const [rows_c, setRows_c] = useState([null]);

  const [startCounter, setStartCounter] = useState(false);

  const handleWaypointEnter = () => {
    setStartCounter(true);
  };

  const fetchData_Who = async () => {
    try {
      const response = await CRMService.fetchAll_WhoAreWe(); // Appelez fetchAll sur l'objet
      setRows(response.data); // Accédez à la propriété data de la réponse
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  const fetchData_Contacts = async () => {
    try {
      const response = await CRMService.fetchAll_Contacts(); // Appelez fetchAll sur l'objet
      setRows_c(response.data); // Accédez à la propriété data de la réponse
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
    }
  };

  useEffect(() => {
    handleWaypointEnter();
    fetchData_Who();
    fetchData_Contacts();
  }, []);

  useEffect(() => {}, [rows, rows_c]);
  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-6">
          {rows.map((item, index1) => (
            <div key={index1} className="row gx-3 h-100">
              <div className="col-6 align-self-start wow fadeInUp" data-wow-delay="0.1s">
                <img className="img-fluid" src={URL_.LOCAL_FILES + "/crm/" + item?.businessLogo} />
              </div>
              <div className="col-6 align-self-end wow fadeInDown" data-wow-delay="0.1s">
                <img className="img-fluid" src={URL_.LOCAL_FILES + "/crm/" + item?.businessLogo} />
              </div>
            </div>
          ))}
        </div>
        {rows.map((item, index) => (
          <div key={index} className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
            <p className="fw-medium text-uppercase text-primary mb-2">About Us</p>
            <h1 className="display-5 mb-4">{item?.businessTitle}</h1>
            <p className="mb-4">{item?.businessDescription}</p>
            <div className="d-flex align-items-center mb-4">
              <div className="flex-shrink-0 bg-primary p-4 text-center">
                <h1 className="display-2 text-white">
                  {startCounter && (
                    <CountUp
                      end={new Date()?.getFullYear() - item?.businessDateFoundation.slice(0, 4)}
                      duration={5}
                    />
                  )}
                </h1>
                <h5 className="text-white">Years of</h5>
                <h5 className="text-white">Experience</h5>
              </div>

              <div className="ms-4">
                {item?.businessDetails?.map((value) => (
                  <p key={value}>
                    <i className="fa fa-check text-primary me-2"></i>
                    {value}
                  </p>
                ))}
              </div>
            </div>
            <div className="row pt-2">
              {rows_c?.map((item_c, index_c) => (
                <div key={index_c} className="col-sm-6">
                  <div className="d-flex align-items-center">
                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                      <i className="fa fa-envelope-open text-white"></i>
                    </div>
                    <div className="ms-3">
                      <p className="mb-2">Email us</p>
                      <h5 className="mb-0">{item_c?.email[0]}</h5>
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-4 ">
                    <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
                      <i className="fa fa-phone text-white"></i>
                    </div>
                    <div className="ms-3">
                      <p className="mb-2">Contact us</p>
                      <h5 className="mb-0">{item_c?.phone[0]}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
