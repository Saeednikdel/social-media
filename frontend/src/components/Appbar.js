import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import {
  Brightness7,
  Brightness4,
  PermIdentityRounded,
  Menu,
  Settings,
  ArrowBack,
  BookmarkBorder,
  ArrowForward,
} from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  center: { flexGrow: 1, textAlign: "center" },
  rightIcons: { flexGrow: 1 },
  navLink: {
    textDecoration: "none",
    color: "inherit",
    display: "flex",
    alignItems: "center",
    padding: 20,
  },
  list: {
    width: 280,
  },
  fullList: {
    width: "auto",
  },
  menuicon: {
    marginLeft: 10,
    marginRight: 10,
  },
}));

const Appbar = ({
  isAuthenticated,
  logout,
  checked,
  onChange,
  history,
  user,
}) => {
  const classes = useStyles();

  const logOut = () => {
    logout();
    setDrawerState(!drawerstate);
  };
  const [drawerstate, setDrawerState] = useState(false);
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawerState(!drawerstate);
  };
  return (
    <>
      <AppBar position="sticky" color="inherit">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <div className={classes.center}></div>
          <IconButton color="inherit" onClick={onChange}>
            {checked ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor={"left"} open={drawerstate} onClose={toggleDrawer}>
        <div className={classes.list}>
          <Toolbar>
            <Link className={classes.navLink} to="/" onClick={toggleDrawer}>
              <Typography variant="h6" color="textPrimary">
                صفحه اصلی
              </Typography>
            </Link>
          </Toolbar>

          {isAuthenticated ? (
            <>
              <Link
                className={classes.navLink}
                to={user && `/profile/${user.id}/`}
                onClick={toggleDrawer}
              >
                <PermIdentityRounded className={classes.menuicon} />
                <Typography variant="body1">پروفایل</Typography>
              </Link>
              <Link
                className={classes.navLink}
                to="/bookmark"
                onClick={toggleDrawer}
              >
                <BookmarkBorder className={classes.menuicon} />
                <Typography variant="body1">ذخیره شده</Typography>
              </Link>
              <Link
                className={classes.navLink}
                to="/setting"
                onClick={toggleDrawer}
              >
                <Settings className={classes.menuicon} />
                <Typography variant="body1">تنظیمات</Typography>
              </Link>
              <Link className={classes.navLink} onClick={() => logOut()}>
                <ArrowForward className={classes.menuicon} />
                <Typography variant="body1">خروج</Typography>
              </Link>
            </>
          ) : (
            <Link
              className={classes.navLink}
              to="/login"
              onClick={toggleDrawer}
            >
              <ArrowBack className={classes.menuicon} />
              <Typography variant="body1">ورود</Typography>
            </Link>
          )}
        </div>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Appbar);
