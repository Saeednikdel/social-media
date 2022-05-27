import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
  Divider,
  TextField,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import {
  Brightness7,
  Brightness4,
  PermIdentityRounded,
  Menu,
  SearchSharp,
  Settings,
  ArrowBack,
  BookmarkBorder,
  ArrowForward,
} from "@material-ui/icons";
import logo from "../sk.svg";
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
  useEffect(() => {}, []);
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
  const [expanded, setExpanded] = useState(false);
  const handleExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [search, setSearch] = useState("");
  const onTextChange = (e) => setSearch(e.target.value);

  const onSearch = (e) => {
    e.preventDefault();
    const currentUrlParams = new URLSearchParams();
    currentUrlParams.set("keyword", search);
    if (window.location.pathname === "/") {
      history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
    } else {
      window.location.replace("/?keyword=" + search);
    }
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
      <Toolbar>
        <div className={classes.rightIcons}></div>
        <form autoComplete="off" onSubmit={(e) => onSearch(e)}>
          <TextField
            autoComplete="off"
            style={{ marginTop: 5 }}
            id="search"
            placeholder="جستجو"
            color="secondary"
            variant="outlined"
            value={search}
            onChange={(e) => onTextChange(e)}
            size="small"
            InputProps={{
              endAdornment: (
                <IconButton color="inherit" size="small" type="submit">
                  <SearchSharp />
                </IconButton>
              ),
            }}
          />
        </form>
      </Toolbar>
      <Divider />

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

export default withRouter(connect(mapStateToProps, { logout })(Appbar));
