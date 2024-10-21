import React, { useEffect, useState } from "react";
import { Oval } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import QuoteService from "../../services/quote/QuoteService";
import ServicesService from "services/services/ServicesService";
import PageHeader from "components/HeaderSections/PageHeader";
import ProfileService from "services/profile/ProfileService";

export default function Quote() {
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

  const accessToken = localStorage.getItem("accessToken");

  const [companyName, setCompanyName] = useState("");
  const [contactName, setContactName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [services, setServices] = useState([]);
  const [subServices, setSubServices] = useState([]);

  const [budget, setBudget] = useState("");
  const [limitDate, setLimitDate] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [attachment, setAttachment] = useState(null);

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isRequired, setIsRequired] = useState(false);

  // Initialisation des états pour les services et sous-services sélectionnés
  const [selectedSubService, setSelectedSubService] = useState([]);

  const handleFileChange = (event) => {
    setAttachment(event.target.files[0]);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;

    fetchServices();
    fetchSubServices();
  }, [pathname]);

  const fetchServices = async () => {
    try {
      const res = await ServicesService.fetchAll();
      setServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSubServices = async () => {
    try {
      const res = await ServicesService.fetchAllS();
      setSubServices(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubServiceChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedSubService(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (!accessToken) {
      addToast("Could not create quote without login.", {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      if (
        companyName === "" ||
        !selectedSubService ||
        budget === 0 ||
        description === "" ||
        detail === "" ||
        limitDate === null ||
        attachment === null ||
        user === null
      ) {
        addToast("All fields are required.", {
          appearance: "error",
          autoDismiss: true,
        });
        setIsRequired(true);
        setErrorMsg("All fields are required.");
      } else {
        formData.append("companyName", companyName);
        formData.append("contactName", JSON.stringify(user?.name));
        formData.append("email", JSON.stringify(user?.email));
        formData.append("phoneNumber", JSON.stringify(user?.phone));
        formData.append("description", description);
        formData.append("detail", detail);
        formData.append("budget", budget);
        formData.append("limitDate", limitDate);
        formData.append("subServices", JSON.stringify(selectedSubService));
        formData.append("attachment", attachment);
        formData.append("userId", user?._id);
        setIsRequired(false);
        try {
          setIsLoading(true);
          await QuoteService.create(formData);
          setIsLoading(false);
          addToast("Quote request submitted successfully.", {
            appearance: "success",
            autoDismiss: true,
          });
          setSuccessMsg("Quote request submitted successfully.");
        } catch (error) {
          addToast("" + error, {
            appearance: "error",
            autoDismiss: true,
          });
          setIsLoading(false);
        }
      }
    }
  };
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchProfile = async () => {
      await ProfileService.getProfile().then((res) => {
        setUser(res?.data);
      });
    };
    fetchProfile();
  }, [user]);

  return (
    <React.Fragment>
      <PageHeader user={user} title="Profile" home="Home" currentLink="Profile" />
      <div className={`container justify-content-center ${isMobile ? "w-100" : "w-50"} mt-3`}>
        <h1 className="title">Get a quote</h1>
        <p className="desc">Request your quote</p>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-lg-6 col-md-10 col-sm-12">
              {isRequired ? (
                <div className="form-floating">
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    type="text"
                    style={{ border: "1px solid #F8D7DA", backgroundColor: "#F8D7DA" }}
                    className="form-control"
                    id="companyName"
                    name="companyName"
                    placeholder="Company Name"
                  />
                  <label className="text-dark" htmlFor="companyName">
                    Company Name (Required)
                  </label>
                </div>
              ) : (
                <div className="form-floating">
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    type="text"
                    className="form-control"
                    id="companyName"
                    name="companyName"
                    placeholder="Company Name"
                  />
                  <label htmlFor="companyName">Company Name</label>
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="form-floating">
                <input
                  value={contactName || user.name}
                  readOnly
                  onChange={(event) => setContactName(event.target.value)}
                  type="text"
                  className="form-control"
                  id="contactName"
                  name="contactName"
                  placeholder="Contact Name"
                />
                <label htmlFor="contactName">Contact Name</label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="form-floating mt-3">
                <input
                  value={email || user.email}
                  readOnly
                  onChange={(event) => setEmail(event.target.value)}
                  name="email"
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            <div className="col-lg-6 col-md-10 col-sm-12">
              <div className="form-floating mt-3">
                <input
                  value={phoneNumber || user.phone}
                  readOnly
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  name="phoneNumber"
                  type="text"
                  className="form-control"
                  id="phoneNumber"
                  placeholder="Your Phone Number"
                />
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
            </div>
          </div>

          {isRequired ? (
            <div className="form-floating mt-3">
              <select
                multiple
                style={{ height: "auto", border: "1px solid #F8D7DA", backgroundColor: "#F8D7DA" }}
                name="subServices"
                className="form-control"
                onChange={handleSubServiceChange}
              >
                {services.map((item1) => (
                  <React.Fragment key={item1}>
                    {subServices.map((item) => (
                      <React.Fragment key={item._id}>
                        {item1._id === item?.service?._id && (
                          <React.Fragment>
                            <option disabled value="">
                              {item1.title}
                            </option>
                            <option value={item._id} key={item._id}>
                              {item.title}
                            </option>
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                ))}
              </select>
              <label htmlFor="subServiceType">Service Type Requested (Required)</label>
            </div>
          ) : (
            <div className="form-floating mt-3">
              <select
                multiple
                style={{ height: "auto", backgroundColor: "#fff" }}
                name="subServices"
                className="form-control"
                onChange={handleSubServiceChange}
              >
                {subServices.map((item) => (
                  <option value={item._id} key={item._id}>
                    &nbsp; &nbsp; {item?.title} - {item?.service?.title}
                  </option>
                ))}
              </select>
              <label htmlFor="subServiceType">Service Type Requested (Required)</label>
            </div>
          )}
          {isRequired ? (
            <div className="form-floating mt-3">
              <textarea
                value={description}
                style={{ border: "1px solid #F8D7DA", backgroundColor: "#F8D7DA" }}
                onChange={(event) => setDescription(event.target.value)}
                className="form-control"
                id="description"
                placeholder="Your Details"
              />
              <label htmlFor="description">Description (Required)</label>
            </div>
          ) : (
            <div className="form-floating mt-3">
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="form-control"
                id="description"
                placeholder="Your Details"
              />
              <label htmlFor="description">Description</label>
            </div>
          )}

          <div className="row">
            <div className="col-lg-6 col-md-10 col-sm-12">
              {isRequired ? (
                <div className="form-floating mt-3">
                  <input
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    style={{ border: "1px solid #F8D7DA", backgroundColor: "#F8D7DA" }}
                    type="number"
                    className="form-control"
                    id="budget"
                    name="budget"
                    placeholder="Your Budget"
                  />
                  <label htmlFor="budget">Budget ($ / TND) (Required)</label>
                </div>
              ) : (
                <div className="form-floating mt-3">
                  <input
                    value={budget}
                    onChange={(event) => setBudget(event.target.value)}
                    type="number"
                    className="form-control"
                    id="budget"
                    name="budget"
                    placeholder="Your Budget"
                  />
                  <label htmlFor="budget">Budget ($ / TND)</label>
                </div>
              )}
            </div>
            <div className="col-lg-6 col-md-10 col-sm-12">
              {isRequired ? (
                <div className="form-floating mt-3">
                  <input
                    value={limitDate}
                    onChange={(event) => setLimitDate(event.target.value)}
                    style={{ border: "1px solid #F8D7DA", backgroundColor: "#F8D7DA" }}
                    type="date"
                    className="form-control"
                    id="limitDate"
                  />
                  <label htmlFor="limitDate">Limit Date (Required)</label>
                </div>
              ) : (
                <div className="form-floating mt-3">
                  <input
                    value={limitDate}
                    onChange={(event) => setLimitDate(event.target.value)}
                    type="date"
                    className="form-control"
                    id="limitDate"
                  />
                  <label htmlFor="limitDate">Limit Date</label>
                </div>
              )}
            </div>
          </div>

          {isRequired ? (
            <div className="form-floating mt-3">
              <input
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                style={{ border: "1px solid #F8D7DA", backgroundColor: "#F8D7DA" }}
                name="detail"
                type="text"
                className="form-control"
                id="referral"
                placeholder="Your Answer"
              />
              <label htmlFor="referral">How did you hear about us? (Required) </label>
            </div>
          ) : (
            <div className="form-floating mt-3">
              <input
                value={detail}
                onChange={(event) => setDetail(event.target.value)}
                name="detail"
                type="text"
                className="form-control"
                id="referral"
                placeholder="Your Answer"
              />
              <label htmlFor="referral">How did you hear about us? </label>
            </div>
          )}

          {isRequired ? (
            <div className="form-floating mt-3">
              <input
                accept=".doc,.docx,.pdf"
                onChange={handleFileChange}
                style={{ border: "1px solid #F8D7DA", backgroundColor: "#F8D7DA" }}
                type="file"
                className="form-control"
                id="attachment"
                placeholder="Upload attachment"
              />
              <label htmlFor="attachment">Attachment (Required)</label>
            </div>
          ) : (
            <div className="form-floating mt-3">
              <input
                accept=".doc,.docx,.pdf"
                onChange={handleFileChange}
                type="file"
                className="form-control"
                id="attachment"
                placeholder="Upload attachment"
              />
              <label htmlFor="attachment">Attachment</label>
            </div>
          )}

          <div className="mt-3">
            <button
              disabled={isLoading}
              className="mt-3 w-100 btn btn-primary py-3 px-5 text-white"
              type="submit"
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
                <span style={{ color: "white" }}>Send</span>
              )}
            </button>
          </div>
          <div className="mt-3">
            {successMsg && <div className="alert alert-success">{successMsg}</div>}
            {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
