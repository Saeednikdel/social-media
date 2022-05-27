import React from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

import {
  AppBar,
  makeStyles,
  Toolbar,
  IconButton,
  Fab,
} from "@material-ui/core";

import {
  EmailOutlined,
  Add,
  NotificationsNone,
  HomeOutlined,
  Search,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

function BottomBar() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <AppBar position="fixed" color="inherit" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.navLink} to="/messages">
            <IconButton color="inherit" aria-label="Open drawer">
              <EmailOutlined />
            </IconButton>
          </Link>
          <Link className={classes.navLink} to="/notification">
            <IconButton color="inherit">
              <NotificationsNone />
            </IconButton>
          </Link>
          <Link className={classes.navLink} to="/newpost">
            <Fab color="secondary" size="small" aria-label="new">
              <Add />
            </Fab>
          </Link>
          <IconButton color="inherit">
            <Search />
          </IconButton>
          <Link className={classes.navLink} to="/">
            <IconButton color="inherit">
              <HomeOutlined />
            </IconButton>
          </Link>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default BottomBar;
