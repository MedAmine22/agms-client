import React from "react";
import ContactInfo from "./ContactInfo/ContactInfo";
import ContactLocation from "./ContactInfo/ContactLocation";

export default function () {
  return (
    <div>
      <div className="container-xxl py-5">
        <div className="container">
          <ContactInfo />
          <ContactLocation />
        </div>
      </div>
    </div>
  );
}
