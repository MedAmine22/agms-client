import React, { useEffect, useState } from "react";
import TitleService from "./TitleService";
import ServiceItems from "./ServiceItems";
import ServicesService from "services/services/ServicesService";

export default function Services() {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    const fetchAll = async () => {
      try {
        await ServicesService.fetchAll().then((res) => {
          setRows(res.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchAll();
  }, []);

  useEffect(() => {}, [rows]);
  return (
    <div className="container">
      <TitleService />
      <ServiceItems rows={rows} />
    </div>
  );
}
