/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./myquotes.css"; // Assurez-vous d'importer le fichier CSS
import QuoteService from "../../../services/quote/QuoteService";
import URL from "../../../URL";
import PageHeader from "components/HeaderSections/PageHeader";
import { useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import { Oval } from "react-loader-spinner";

// eslint-disable-next-line no-unused-vars
export const CancelQuote = ({ user }) => {
  const [cancelText, setCancelText] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { addToast } = useToasts();

  const { id } = useParams();

  const handleRequest = async (data) => {
    try {
      await QuoteService.cancel(id, { cancelText: cancelText, cancelReason: cancelReason }).then(
        () => {
          addToast("Quote request submitted successfully.", {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccessMsg("Quote request submitted successfully.");
        }
      );
    } catch (error) {
      addToast("" + error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  return (
    <div>
      <div className="row">
        <PageHeader user={user} title="Cancel Quote" home="Home" currentLink="Cancel Quote" />
        <div className="col-12">
          <div className="w-100">
            <div className="container">
              <h3 className="text-justify">Send a request to cancel your quote</h3>
              <div className="form-floating mt-3">
                <input
                  name="cancelText"
                  onChange={(e) => setCancelText(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Your Text"
                />
                <label htmlFor="email">Cancel Request</label>
              </div>
              <div className="form-floating mt-3">
                <select
                  onChange={(e) => setCancelReason(e.target.value)}
                  defaultValue={""}
                  name="cancelReason"
                  className="form-control"
                >
                  <option value="">Select your reason</option>
                  <option value="Reason 1">Reason 1</option>
                  <option value="Reason 2">Reason 2</option>
                  <option value="Reason 3">Reason 3</option>
                </select>
                <label htmlFor="email">Cancel Reason</label>
              </div>
              <div className="d-flex justify-content-end">
                <button
                  disabled={isLoading}
                  onClick={handleRequest}
                  className="mt-3 w-25 btn btn-primary py-3 px-5 text-white"
                  type="button"
                  // Changed to type="button" and onClick
                >
                  {isLoading ? (
                    <Oval
                      visible={true}
                      height="30"
                      width="30"
                      color="#fff"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    <span style={{ color: "white" }}>Send Request</span>
                  )}
                </button>
              </div>
              {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
