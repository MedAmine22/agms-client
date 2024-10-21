/* eslint-disable react/prop-types */
import React from "react";

function PageHeader({ title, home, currentLink }) {
  return (
    <div>
      <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
        <div className="container py-5">
          <h1 className="display-3 text-white animated slideInRight">{title && title}</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb animated slideInRight mb-0">
              <li className="breadcrumb-item">
                <a href="#">{home && home}</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                <b>{currentLink && currentLink}</b>
              </li>
            </ol>
          </nav>
        </div>
      </div>
    </div>
  );
}
export default PageHeader;
