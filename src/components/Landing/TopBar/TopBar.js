import React, { useEffect, useState } from "react";
import CRMService from "services/crm/CRMService";

/* import Select from "react-select";
import Flag from "react-country-flag";

const countries = [
  { value: "US", label: "United States" },
  { value: "FR", label: "French" },
  // Add more countries as needed
];

const customStyles = {
  option: (provided) => ({
    ...provided,
    borderBottom: "1px solid #ccc",
    padding: 10,
    display: "flex",
    alignItems: "center",
  }),
};

const countryOption = (option) => (
  <div style={{ display: "flex", alignItems: "center" }}>
    <Flag
      countryCode={option.value}
      style={{
        marginRight: "10px",
        width: "25px",
        height: "auto",
      }}
    />
    <span>{option.label}</span>
  </div>
); */
function TopBar() {
  const [rows, setRows] = useState([]);
  const [rows_, setRows_] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await CRMService.fetchAll_Contacts().then((res) => {
        setRows(res?.data);
      });
    };
    const fetchData1 = async () => {
      await CRMService.fetchAll_Social().then((res) => {
        setRows_(res.data);
      });
    };
    fetchData();
    fetchData1();
  }, []);

  useEffect(() => {}, [rows, rows_]);
  return (
    <div className="container-fluid bg-top-bar-left px-0">
      <div className="row g-0 d-none d-lg-flex">
        <div className="col-lg-6 ps-5 text-start">
          <div className="h-100 d-inline-flex align-items-center text-primary">
            <span className="fs-6 fw-bold me-2">Follow Us : </span>
            {rows_.map((item1, index1) => (
              <a
                key={index1}
                className="btn btn-square btn-primary rounded-circle me-2 text-white"
                href={item1.link}
              >
                <i className={`fab fa-${item1.title}`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="col-lg-6 text-end">
          <div className="h-100 topbar-right d-inline-flex align-items-center text-white py-2 px-5">
            <span className="fs-6 fw-bold me-2">
              <i className="fa fa-phone-alt me-2"></i>Call Us :
            </span>
            {rows.map((item, index) => (
              <a
                href={"phone:" + item.phone}
                key={index}
                style={{ fontSize: 12 }}
                className="fs-6 fw-bold text-white"
              >
                {item.phone[0]}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;
