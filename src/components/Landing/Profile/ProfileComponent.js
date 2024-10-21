/* eslint-disable react/prop-types */
import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { ViewProfile } from "./ViewProfile";
import { EditProfile } from "./EditProfile";
import { MyQuotes } from "./MyQuotes";
import { MyContracts } from "./MyContracts";
import { LeaveReview } from "pages/Feedback/LeaveReview";

export const ProfileComponent = ({ user, onUpdate }) => {
  const updateUser = (newUser) => {
    onUpdate(newUser);
  };
  return (
    <div className="container">
      <div className="row g-5">
        <div className="col-lg-12 wow fadeIn" data-wow-delay="0.5s">
          <Tabs>
            <TabList
              className={"d-flex justify-content-center align-items-center px-5"}
              style={{ height: 50 }}
            >
              <Tab style={{ height: 40, marginRight: 30 }}>View Profile</Tab>
              <Tab style={{ height: 40, marginRight: 30 }}>Edit Profile</Tab>
              <Tab style={{ height: 40, marginRight: 30 }}>My Quotes</Tab>
              <Tab style={{ height: 40, marginRight: 30 }}>My Contracts</Tab>
              <Tab style={{ height: 40, marginRight: 30 }}>Feedback</Tab>
            </TabList>

            <TabPanel style={{ paddingLeft: 100 }} className={"mt-5 mx-5"}>
              <ViewProfile user={user} />
            </TabPanel>
            <TabPanel style={{ paddingLeft: 100 }} className={"mt-5 mx-5"}>
              <EditProfile user={user} onUpdate={updateUser} />
            </TabPanel>
            <TabPanel style={{ paddingLeft: 100 }} className={"mt-5 mx-5"}>
              <MyQuotes user={user} />
            </TabPanel>
            <TabPanel style={{ paddingLeft: 100 }} className={"mt-5 mx-5"}>
              <MyContracts user={user} />
            </TabPanel>
            <TabPanel style={{ paddingLeft: 100 }} className={"mt-5 mx-5"}>
              <LeaveReview user={user} />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
