import React, { useEffect, useRef, useState } from "react";
import { Typography, Avatar, makeStyles, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import { load_notif } from "../actions/auth";
import NotifCard from "../components/NotifCard";

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  avatar: {
    height: 50,
    width: 50,
  },
}));
const Messages = ({ load_notif, isAuthenticated, notification }) => {
  useEffect(() => {
    load_notif(1);
  }, []);
  const classes = useStyles();
  if (isAuthenticated === false) return <Redirect to="/login" />;
  return (
    <>
      {notification && notification.notification.length > 0 ? (
        notification.notification.map((notif) => <NotifCard notif={notif} />)
      ) : (
        <Typography>No Notification</Typography>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  notification: state.auth.notification,
});
export default connect(mapStateToProps, { load_notif })(Messages);
