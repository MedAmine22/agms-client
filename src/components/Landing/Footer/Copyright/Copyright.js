import React from "react";

export default function Copyright() {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <div className="container text-center">
      <p className="mb-2">
        Copyright &copy; {year} &nbsp;
        <a className="fw-semi-bold text-primary" href="#">
          AGMS GLOBAL
        </a>
        , All Right Reserved.
      </p>
      <p className="mb-0">
        Developed By{" "}
        <a className="fw-semi-bold text-primary" href="https://ipactconsult.com">
          IPACT Consult
        </a>
      </p>
    </div>
  );
}
