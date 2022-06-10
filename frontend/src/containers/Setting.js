import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { connect } from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
import { NavLink } from "react-router-dom";
import ProfileSetting from "./ProfileSetting";
import ResumeSetting from "./ResumeSetting";

const Setting = ({ isAuthenticated, match }) => {
  const tab = match.params.tab;
  if (isAuthenticated === false) return <Redirect to="/login" />;
  const tabList = [
    {
      label: "پروفایل",
      value: "profile",
      to: "/setting/profile",
    },
    {
      label: "رزومه",
      value: "resume",
      to: "/setting/resume",
    },
  ];
  return (
    <div>
      <Tabs value={tab} indicatorColor="primary" textColor="primary">
        {tabList.map((tab) => (
          <Tab
            style={{ flexGrow: 1 }}
            label={tab.label}
            value={tab.value}
            to={tab.to}
            component={NavLink}
          />
        ))}
      </Tabs>
      <ProfileComponent value={tab} />
    </div>
  );
};

function ProfileComponent({ value }) {
  switch (value) {
    case "profile":
      return <ProfileSetting />;
    case "resume":
      return <ResumeSetting />;
    default:
      return <h1>error</h1>;
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Setting);
