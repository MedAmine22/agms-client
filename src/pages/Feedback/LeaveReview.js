/* eslint-disable react/no-unknown-property */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import { Oval } from "react-loader-spinner";
import FeedbackService from "services/feedback/FeedbackService";

// eslint-disable-next-line no-unused-vars
export const LeaveReview = ({ user }) => {
  const [message, setMessage] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = localStorage.getItem("accessToken");

  const { addToast } = useToasts();

  const handleRequest = async () => {
    try {
      await FeedbackService.leaveF({
        message: message,
        userId: user?._id,
        isConfirmed: "" + false,
      }).then(() => {
        addToast("Feedback request submitted successfully.", {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccessMsg("Quote request submitted successfully.");
      });
    } catch (error) {
      addToast("" + error, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  useEffect(() => {}, [user]);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="w-100">
            <div className="container">
              <h3 className="text-justify">Leave your feedback about our service</h3>
              <div className="form-floating mt-3">
                <textarea
                  rows={20}
                  cols={90}
                  name="message"
                  onChange={(e) => setMessage(e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Your Text"
                ></textarea>
                <label htmlFor="message">Your Message</label>
              </div>

              <div className="d-flex justify-content-end">
                {!accessToken ? null : (
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
                      <span style={{ color: "white" }}>Send Feedback</span>
                    )}
                  </button>
                )}
              </div>
              {successMsg && <div className="alert alert-success mt-3">{successMsg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
