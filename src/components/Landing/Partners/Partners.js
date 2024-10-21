import React, { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import ContactService from "services/contact/ContactService";
import URL from "../../../URL";

export default function Partners() {
  const [rows, setRows] = useState([]);
  const fetchData = async () => {
    try {
      await ContactService.retrieve().then((res) => {
        setRows(res);
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [rows]);
  return (
    <React.Fragment>
      <div
        className="text-center mx-auto mt-5 wow fadeIn"
        data-wow-delay="0.1s"
        style={{ maxWidth: "600px" }}
      >
        <p className="fw-medium text-uppercase text-primary mb-2">Our Parterns</p>
        <h1 className="display-5 mb-5 text-dark">They Trust Our Quality</h1>
      </div>
      <Marquee className="d-flex">
        {rows.map((item) => (
          <img
            key={item?._id}
            className="p-2"
            width={180}
            src={`${URL.LOCAL_FILES + "/partners/" + item?.logo}`}
            alt=""
          />
        ))}
      </Marquee>
    </React.Fragment>
  );
}
