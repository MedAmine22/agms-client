/* eslint-disable react/prop-types */
import React from "react";
import URL from "../../../URL.js";

export const ViewProfile = ({ user }) => {
  return (
    <div>
      <p className="fw-medium text-uppercase text-primary mb-2">Account information</p>
      <h1 className="display-5 mb-4">Profile</h1>
      <div className="row container">
        <div className="col-12 d-flex justify-content-center">
          <div className="d-flex align-items-center">
            <div className="">
              <img
                src={`${URL.LOCAL_FILES}/user/${user?.avatar}`}
                style={{ borderRadius: 50, height: 100, width: 100 }}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-sm-12 mt-4">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-user text-white"></i>
            </div>
            <div className="ms-3">
              <p className="mb-2">Name</p>
              <h5 className="mb-0">{user?.name}</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-sm-12 mt-4">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-phone text-white"></i>
            </div>
            <div className="ms-3">
              <p className="mb-2">Phone</p>
              <h5 className="mb-0">{user?.phone}</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-5 col-sm-12 mt-4">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-envelope-open text-white"></i>
            </div>
            <div className="ms-3">
              <p className="mb-2">Email</p>
              <h5 className="mb-0">{user?.email}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
