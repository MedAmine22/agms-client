/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "./myquotes.css"; // Assurez-vous d'importer le fichier CSS
import QuoteService from "../../../services/quote/QuoteService";
import URL from "../../../URL";

// eslint-disable-next-line no-unused-vars
export const MyQuotes = ({ user }) => {
  const [rows, setRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [filteredRows, setFilteredRows] = useState([]);

  const fetchData = async () => {
    try {
      await QuoteService.retrieve().then((res) => {
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

  const handleCancelLink = (e, id) => {
    e?.preventDefault();
    window.location.href = "/cancel-quote/" + id;
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
                <div className="mt-3 bg-transparent">
                  <div className="d-flex justify-content-end align-items-end">
                    <button className="button1  mx-2">{item.status}</button>

                    <button onClick={(e) => handleCancelLink(e, item?._id)} className="button mx-1">
                      <i title="cancel" className="text-primary fa fa-close"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <h5
                    style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                    className="text-center text-light"
                  >
                    Code : {item._id.slice(0, 7)}
                  </h5>
                  <p style={{ fontSize: 14 }} className="text-justify mt-3">
                    Limit Date : <b className="text-primary">{item.limitDate.slice(0, 10)}</b>{" "}
                  </p>
                  <p style={{ fontSize: 14 }} className="text-justify">
                    Requested Services : <b>{item?.subServices?.length} service(s)</b>
                  </p>
                  <p style={{ fontSize: 14 }} className="text-justify d-flex">
                    Updated At :{" "}
                    {item.updatedAt != null ? (
                      <b className="text-primary mx-1">{item.updatedAt?.slice(0, 10)}</b>
                    ) : (
                      <p style={{ color: "#ccc" }} className="mx-1">
                        <b>No Changes</b>
                      </p>
                    )}{" "}
                  </p>
                  <p style={{ fontSize: 14 }} className="text-justify">
                    Attachment :{" "}
                    <a
                      href={`${URL.LOCAL_FILES}/quote/${item?.attachment}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#ccc" }}
                    >
                      <i className="fa fa-file" /> Open file
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
