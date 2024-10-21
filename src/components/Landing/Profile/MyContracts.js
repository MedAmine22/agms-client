/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./myquotes.css"; // Assurez-vous d'importer le fichier CSS
import QuoteService from "../../../services/quote/QuoteService";
import URL from "../../../URL";
import { useToasts } from "react-toast-notifications";

// eslint-disable-next-line no-unused-vars
export const MyContracts = ({ user }) => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { addToast } = useToasts();

  const [attachmentU, setAttachmentU] = useState(null);

  const handleFile = (e) => {
    setAttachmentU(e.target.files[0]);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    const formData = new FormData();
    try {
      formData.append("attachmentU", attachmentU);

      if (attachmentU === null) {
        addToast("Required field", {
          autoDismiss: true,
          appearance: "error",
        });
      } else {
        await QuoteService.updateByUser(id, formData).then(() => {
          addToast("Contract sended with success", {
            autoDismiss: true,
            appearance: "success",
          });
        });
      }
    } catch (error) {
      addToast("" + error, {
        autoDismiss: true,
        appearance: "error",
      });
    }
  };
  // eslint-disable-next-line no-unused-vars
  const [filteredRows, setFilteredRows] = useState([]);

  const fetchData = async () => {
    try {
      await QuoteService.retrieveC().then((res) => {
        setRows(res?.data);
        console.log(JSON.stringify(res?.data));
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const results = rows.filter((row) =>
      row?._id?.toLowerCase().includes(searchTerm?.toLowerCase())
    );
    setFilteredRows(results);
  }, [searchTerm, rows]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // alert(JSON.stringify(rows));
  }, [rows, user?._id, searchTerm, fetchData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="w-50">
            <input
              style={{ height: 50, fontSize: 14 }}
              placeholder="Search By Code ..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="form-control"
            />
          </div>
        </div>
      </div>
      <div className="row mt-3">
        {filteredRows.map((item) => (
          <div key={item._id} className="col-lg-4 mt-4">
            {item?.userId == user?._id && (
              <div
                className="card"
                style={{
                  borderRadius: 5,
                  color: "white",
                  backgroundImage:
                    "url(https://img.freepik.com/free-vector/gradient-particle-wave-background_23-2150462041.jpg)",
                }}
              >
                <div className="container">
                  <div className="mt-3 row bg-transparent">
                    <div className="col-6  justify-content-start align-items-start">
                      <button className="button1">
                        Quote : <b>{item.quoteId.slice(0, 7)}</b>
                      </button>
                    </div>
                    <div className="col-3"></div>
                    <div className="col-3 justify-content-end align-items-end">
                      <button className="button1">{item.status}</button>
                    </div>
                  </div>
                </div>
                <div className="card-body">
                  <p style={{ fontSize: 14 }} className="text-justify mt-3">
                    Created At :{" "}
                    <b className="text-primary">
                      {item.createdAt.slice(0, 10)} - {item.createdAt.slice(11, 15)}
                    </b>{" "}
                  </p>
                  <p style={{ fontSize: 14 }} className="text-justify d-flex">
                    Updated At :{" "}
                    {item.updatedAt != null ? (
                      <b className="text-primary mx-1">
                        {" "}
                        {item.createdAt.slice(0, 10)} - {item.createdAt.slice(11, 15)}
                      </b>
                    ) : (
                      <p style={{ color: "#ccc" }} className="mx-1">
                        <b>No Changes</b>
                      </p>
                    )}{" "}
                  </p>
                  <p style={{ fontSize: 14 }} className="text-justify">
                    Attachment :{" "}
                    <a
                      href={`${URL.LOCAL_FILES}/quote/${item?.attachmentS}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#ccc" }}
                    >
                      <i className="fa fa-file" /> Download
                    </a>
                  </p>
                </div>
                <label className="button1 w-auto m-3 p-1 text-center">
                  <input name="attachmentU" onChange={handleFile} hidden type="file" /> Upload
                  Signed Contract
                </label>
                {!attachmentU ? (
                  <button hidden className="w-50 mt-3 button1 w-auto text-center">
                    Send
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleSubmit(e, item?._id)}
                    className="mt-3 w-50 button1 w-auto text-center"
                  >
                    Send
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
