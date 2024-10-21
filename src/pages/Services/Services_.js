/* eslint-disable react/prop-types */
import PageHeader from "components/HeaderSections/PageHeader";
import ServiceItems from "components/Landing/Services/ServiceItems";
import TitleService from "components/Landing/Services/TitleService";
import Reviews from "components/Landing/Testimonials/Reviews";
import { useEffect, useState } from "react";
import ServicesService from "services/services/ServicesService";

export default function Services_() {
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
    <div>
      <PageHeader title="Services" home="Home" currentLink="Services" />
      <TitleService />
      <div className="container">
        {" "}
        <ServiceItems rows={rows} />
        <div className="mt-5"></div>
        <Reviews />
      </div>
    </div>
  );
}
