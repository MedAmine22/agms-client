import React, { useEffect, useState } from "react";
import CRMService from "services/crm/CRMService";

export default function ContactLocation() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      await CRMService.fetchAll_Location().then((res) => {
        setRows(res.data);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {}, [rows]);
  return (
    <div>
      <div className="row mb-5">
        <div className="col-12 wow fadeInUp" data-wow-delay="0.1s">
          {rows.map((item) => (
            <iframe
              key={item?._id}
              className="w-100"
              src={item?.locationURL}
              frameBorder="0"
              style={{ minHeight: 450, border: 0 }}
              allowfullscreen=""
              aria-hidden="false"
              tabIndex="0"
            ></iframe>
          ))}
        </div>
      </div>
    </div>
  );
}
