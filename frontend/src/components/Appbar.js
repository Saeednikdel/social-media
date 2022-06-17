import {
  AppBar,
  Toolbar,
  Typography,
  makeStyles,
  IconButton,
  Drawer,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth";
import translate from "../translate";
import {
  Brightness7,
  Brightness4,
  PermIdentityRounded,
  Menu,
  Settings,
  ArrowBack,
  BookmarkBorder,
  ArrowForward,
  PersonAddOutlined,
  Language,
} from "@material-ui/icons";
import Popup from "./Popup";
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
  navLinkUsers: {
    textDecoration: "none",
    color: "inherit",
  },
  logo: {
    height: 30,
    "&:hover": {
      cursor: "pointer",
    },
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
  button: {
    margin: 20,
  },
}));

const Appbar = ({
  isAuthenticated,
  logout,
  checked,
  onChange,
  changeLang,
  user,
}) => {
  const classes = useStyles();

  const logOut = () => {
    logout();
    setDrawerState(!drawerstate);
  };
  const [drawerstate, setDrawerState] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openLang, setOpenLang] = useState(false);
  const [lang, setlLang] = useState(localStorage.getItem("lang"));
  const langList = [
    { title: translate("English"), value: "en" },
    { title: translate("Farsi"), value: "fa" },
    { title: translate("Kurdish (ku)"), value: "ku" },
    { title: translate("Kurdish (so)"), value: "so" },
    { title: translate("Turkish"), value: "tr" },
    { title: translate("Arabic"), value: "ar" },
  ];
  const handleLang = () => {
    changeLang(lang);
    setOpenPopup(false);
  };
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
      <AppBar position="sticky" elevation={0} color="inherit">
        <Toolbar>
          <IconButton color="inherit" onClick={toggleDrawer}>
            <Menu />
          </IconButton>
          <div className={classes.center}>
            <img
              className={classes.logo}
              onClick={() => {
                window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
              }}
              src={`${process.env.REACT_APP_API_URL}/media/logo.png`}
            />
          </div>
          <Link className={classes.navLinkUsers} to="/users">
            <IconButton color="inherit">
              <PersonAddOutlined />
            </IconButton>
          </Link>
        </Toolbar>
        <Divider />
      </AppBar>
      <Drawer anchor={"left"} open={drawerstate} onClose={toggleDrawer}>
        <div className={classes.list}>
          <Toolbar></Toolbar>

          {isAuthenticated ? (
            <>
              <Link
                className={classes.navLink}
                to={user && `/profile/${user.name}/`}
                onClick={toggleDrawer}
              >
                <PermIdentityRounded className={classes.menuicon} />
                <Typography variant="body1">{translate("profile")}</Typography>
              </Link>
              <Link
                className={classes.navLink}
                to="/bookmark/posts"
                onClick={toggleDrawer}
              >
                <BookmarkBorder className={classes.menuicon} />
                <Typography variant="body1">{translate("bookmark")}</Typography>
              </Link>
              <Link
                className={classes.navLink}
                to="/setting/profile"
                onClick={toggleDrawer}
              >
                <Settings className={classes.menuicon} />
                <Typography variant="body1">{translate("setting")}</Typography>
              </Link>

              <Link className={classes.navLink} onClick={() => logOut()}>
                <ArrowForward className={classes.menuicon} />
                <Typography variant="body1">{translate("log out")}</Typography>
              </Link>
            </>
          ) : (
            <Link
              className={classes.navLink}
              to="/login"
              onClick={toggleDrawer}
            >
              <ArrowBack className={classes.menuicon} />
              <Typography variant="body1">{translate("log in")}</Typography>
            </Link>
          )}
          <Link className={classes.navLink} onClick={onChange}>
            {checked ? (
              <Brightness7 className={classes.menuicon} />
            ) : (
              <Brightness4 className={classes.menuicon} />
            )}
            <Typography variant="body1">
              {checked ? translate(" light theme ") : translate(" dark theme ")}
            </Typography>
          </Link>

          <Link className={classes.navLink} onClick={() => setOpenPopup(true)}>
            <Language className={classes.menuicon} />
            <Typography variant="body1">
              {translate("change language")}
            </Typography>
          </Link>
        </div>
      </Drawer>
      <Popup
        title={translate("change language")}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <FormControl style={{ width: "100%" }}>
          <InputLabel>{translate("choose language")}</InputLabel>
          <Select
            open={openLang}
            onClose={() => setOpenLang(false)}
            onOpen={() => setOpenLang(true)}
            value={lang}
            name="lang"
            onChange={(e) => setlLang(e.target.value)}
          >
            {langList.map((l) => (
              <MenuItem value={l.value}>{l.title}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={classes.center}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={() => handleLang()}
          >
            {translate("ok")}
          </Button>
        </div>
      </Popup>
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { logout })(Appbar);
