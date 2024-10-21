import React from "react";

export const Settings = () => {
  return (
    <div>
      <p className="fw-medium text-uppercase text-primary mb-2">Change Password</p>
      <h1 className="display-5 mb-4">Account</h1>
      <div className="row pt-2">
        <div className="col-sm-12">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-user text-white"></i>
            </div>
            <div className="ms-3 w-100">
              <p className="mb-2">Current password</p>
              <input
                style={{ height: 50, fontSize: 14 }}
                placeholder="Current password"
                type=""
                name=""
                value=""
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-5">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-envelope-open text-white"></i>
            </div>
            <div className="ms-3 w-100">
              <p className="mb-2">New password</p>
              <input
                style={{ height: 50, fontSize: 14 }}
                placeholder="New password"
                type=""
                name=""
                value=""
                className="form-control"
              />
            </div>
          </div>
        </div>
        <div className="col-sm-6 mt-5">
          <div className="d-flex align-items-center">
            <div className="flex-shrink-0 btn-lg-square rounded-circle bg-primary">
              <i className="fa fa-phone-alt text-white"></i>
            </div>
            <div className="ms-3 w-100">
              <p className="mb-2">Confirmation</p>
              <input
                style={{ height: 50, fontSize: 14 }}
                placeholder="Confirmation password"
                type=""
                name=""
                value=""
                className="form-control"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
