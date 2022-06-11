import React from "react";
import { Tabs, Tab } from "@material-ui/core";
import { connect } from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
import { NavLink } from "react-router-dom";
import PostBookmark from "./PostBookmark";
import JobBookmark from "./JobBookmark";

const Bookmark = ({ isAuthenticated, match }) => {
  const tab = match.params.tab;
  if (isAuthenticated === false) return <Redirect to="/login" />;
  const tabList = [
    {
      label: "پست ها",
      value: "posts",
      to: "/bookmark/posts",
    },
    {
      label: "شغل ها",
      value: "jobs",
      to: "/bookmark/jobs",
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
      <BookmarkComponent value={tab} />
    </div>
  );
};

function BookmarkComponent({ value }) {
  switch (value) {
    case "posts":
      return <PostBookmark />;
    case "jobs":
      return <JobBookmark />;
    default:
      return <h1>not found</h1>;
  }
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps)(Bookmark);
