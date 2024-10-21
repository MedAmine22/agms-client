import React, { useEffect, useState } from "react";
import { useToasts } from "react-toast-notifications";
import ContactService from "services/contact/ContactService";
import CRMService from "services/crm/CRMService";
export default function Footer() {
  const [rows_c, setRows_c] = useState([]);
  const [rows_s, setRows_s] = useState([]);
  const [rows_u, setRows_u] = useState([]);
  const [rows_h, setRows_h] = useState([]);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [subject, setSubject] = useState("");

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const { addToast } = useToasts();

  const handleContact = async () => {
    //event.preventDefault();
    try {
      await ContactService.create({ email: email, subject: subject, message: message }).then(() => {
        addToast("Contact request sended with success", {
          appearance: "success",
          autoDismiss: true,
        });
        setSuccessMsg("Contact request sended with success");
      });
    } catch (error) {
      addToast(error, {
        appearance: "error",
        autoDismiss: true,
      });
      setErrorMsg(error);
    }
  };

  const fetchDataC = async () => {
    try {
      await CRMService.fetchAll_Contacts().then((res) => {
        setRows_c(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataS = async () => {
    try {
      await CRMService.fetchAll_Social().then((res) => {
        setRows_s(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataU = async () => {
    try {
      await CRMService.fetchAll_Useful().then((res) => {
        setRows_u(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataH = async () => {
    try {
      await CRMService.fetchAll_Hours().then((res) => {
        setRows_h(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataC();
    fetchDataS();
    fetchDataU();
    fetchDataH();
  }, []);

  useEffect(() => {}, [rows_c]);
  return (
    <div className="container py-5">
      <div className="row g-5">
        <div className="col-lg-3 col-md-6">
          <h5 className="text-white mb-4">Our Office</h5>
          <div className="row">
            {rows_c.map((itemc, indexc) => (
              <div key={indexc} className="col-12">
                <p className="mb-2">
                  <i className="fa fa-map-marker-alt me-3"></i>
                  {itemc.address.map((addr) => addr)}
                </p>
                <p className="mb-2">
                  <i className="fa fa-phone-alt me-3"></i>
                  {itemc.phone.map((ph) => ph)}
                </p>
                <p className="mb-2">
                  <i className="fa fa-envelope me-3"></i>
                  {itemc.email.map((em) => em)}
                </p>
              </div>
            ))}
          </div>

          <div className="d-flex pt-3">
            {rows_s.map((items, indexs) => (
              <a
                key={indexs}
                className="btn btn-square btn-primary rounded-circle me-2"
                href={items.link}
              >
                <i className={`fab fa-${items.title}`}></i>
              </a>
            ))}
          </div>
        </div>
        <div className="col-lg-3 col-md-6">
          <h5 className="text-white mb-4">Quick Links</h5>
          {rows_u.map((itemu, indexu) => (
            <a key={indexu} className="btn btn-link" href="">
              {itemu.title}
            </a>
          ))}
        </div>
        <div className="col-lg-3 col-md-6">
          <h5 className="text-white mb-4">Business Hours</h5>
          {rows_h.map((itemh, indexh) => (
            <div key={indexh}>
              <div>
                <p className="mb-1">
                  {itemh.day.toUpperCase()}

                  {itemh.isClosed === "true" ? (
                    <h6 className="text-light">Closed</h6>
                  ) : (
                    <h6 className="text-light">
                      {itemh.open} am - {itemh.close} pm
                    </h6>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="col-lg-3 col-md-6">
          <h5 className="text-white mb-4">Contact us</h5>
          <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
          <div className="position-relative w-100">
            <input
              className="form-control text-white bg-transparent w-100 py-3 ps-4 pe-5"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
            />

            <input
              className="mt-2 form-control text-white bg-transparent w-100 py-3 ps-4 pe-5"
              type="text"
              placeholder="Your subject"
              name="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
            <textarea
              className="mt-2 form-control text-white bg-transparent w-100 py-3 ps-4 pe-5"
              rows={3}
              placeholder="Your message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
            <div className="d-flex justify-content-end">
              <button
                onClick={handleContact}
                type="button"
                className="mt-2 w-50 btn btn-primary py-2"
              >
                Send
              </button>
            </div>
            <div className="mt-3">
              {successMsg && <div className="alert alert-success">{successMsg}</div>}
              {errorMsg && <div className="alert alert-danger">{errorMsg}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
