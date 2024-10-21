import React, { useEffect, useState } from "react";
import ProjectsService from "services/projects/ProjectsService";
import URL from "../../URL";

export default function GallerySection() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ProjectsService.retrieveAll().then((res) => {
          setRows(res.data);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const onImageClick = (event) => {
    const x = event.target;
    const computedStyle = window.getComputedStyle(x);
    const imageUrl = computedStyle.getPropertyValue("background-image").slice(5, -2);

    if (!imageUrl) return;

    const modal = document.getElementById("modal01");
    modal.style.display = "block";

    const img01 = document.getElementById("img01");
    img01.src = imageUrl;
  };

  const closeModal = () => {
    const modal = document.getElementById("modal01");
    modal.style.display = "none";
  };

  return (
    <React.Fragment>
      <div
        className="text-center mx-auto wow fadeInUp"
        data-wow-delay="0.1s"
        style={{ maxWidth: "600px" }}
      >
        <p className="fw-medium text-uppercase text-primary mb-2">Gallery</p>
        <h1 className="display-5 mb-4 text-white">What We Have DONE</h1>
      </div>
      <div id="grid" className="grid-container" onClick={onImageClick}>
        {rows.map((item, index) => (
          <React.Fragment key={item._id}>
            <div
              style={{
                backgroundImage: `url(${URL.LOCAL_FILES}/crm/${item.image})`,
              }}
              id={`image${index}`}
              className={`griditem image${index}`}
            ></div>
          </React.Fragment>
        ))}
      </div>

      <div id="modal01" className="modal">
        <img id="img01" className="mod-img animate-zoom" />
        <div id="btn1" className="modal-btn" onClick={closeModal}>
          <i className="fa fa-close mt-2" style={{ fontSize: 25 }} />
        </div>
      </div>
    </React.Fragment>
  );
}
