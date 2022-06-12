import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Divider,
  LinearProgress,
  IconButton,
  Button,
  makeStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import { load_user, update_avatar } from "../actions/auth";
import jMoment from "moment-jalaali";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";
import { Edit, AddAPhotoTwoTone } from "@material-ui/icons";
import SetEmail from "./SetEmail";
import SetPassword from "./SetPassword";
import Popup from "../components/Popup";
import SetUserDetail from "./SetUserDetail";
import translate from "../translate";

const useStyles = makeStyles((theme) => ({
  avatar: {
    height: 90,
    width: 90,
    marginLeft: 40,
    marginTop: -50,
    border: "4px solid",
    borderColor: `${theme.palette.primary.border}`,
  },
  editButtonContainer: { flex: 1, display: "flex", justifyContent: "flex-end" },
  header: {
    width: "100%",
    height: 150,
    objectFit: "cover",
  },
  detailContainer: { padding: 20 },
  imageContainer: {
    position: "relative",
  },
  editHeader: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
  editAvatar: {
    position: "absolute",
    top: 35,
    left: 75,
  },
  icon: {
    color: "white",
  },
}));
const ProfileSetting = ({ user, load_user, logout, update_avatar }) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        await load_user();
      } catch (err) {}
    };
    fetchData();
  }, []);
  const [openPopup, setOpenPopup] = useState(false);
  const [childComponent, setchildComponent] = useState("");
  const classes = useStyles();

  const handleDialog = (btnname) => {
    setchildComponent(btnname);
    setOpenPopup(true);
  };

  function ChildrenComponent({ value }) {
    switch (value) {
      case "edit info":
        return (
          <SetUserDetail
            _id={user.id}
            _name={user.name}
            _profile_name={user.profile_name}
            _bio={user.bio}
            _phone_no={user.phone_no}
            _birth_date={user.birth_date}
            setOpenPopup={setOpenPopup}
          />
        );
      case "change email":
        return <SetEmail setOpenPopup={setOpenPopup} />;
      case "change password":
        return <SetPassword setOpenPopup={setOpenPopup} />;
    }
  }
  async function uploadAvatar(e) {
    const image = e.target.files[0];
    update_avatar(image, "avatar");
  }
  async function uploadHeader(e) {
    const image = e.target.files[0];
    update_avatar(image, "header");
  }
  return user ? (
    <div>
      <div className={classes.imageContainer}>
        <img
          src={
            user.header || `${process.env.REACT_APP_API_URL}/media/header.jpg`
          }
          className={classes.header}
          onError={(e) => {
            e.target.src = `${process.env.REACT_APP_API_URL}/media/header.jpg`;
          }}
        />
        <label htmlFor="contained-button-file1" className={classes.editHeader}>
          <input
            accept="image/*"
            id="contained-button-file1"
            // multiple
            style={{ display: "none" }}
            type="file"
            onChange={uploadHeader}
          />
          <AddAPhotoTwoTone className={classes.icon} />
        </label>
      </div>

      <div className={classes.imageContainer}>
        <Avatar className={classes.avatar} src={user.image} />
        <div>
          <label htmlFor="contained-button-file" className={classes.editAvatar}>
            <input
              accept="image/*"
              id="contained-button-file"
              // multiple
              style={{ display: "none" }}
              type="file"
              onChange={uploadAvatar}
            />
            <AddAPhotoTwoTone className={classes.icon} />
          </label>
        </div>
      </div>

      <div className={classes.editButtonContainer}>
        <Button
          style={{ margin: 10 }}
          color="secondary"
          variant="outlined"
          onClick={() => handleDialog("edit info")}
        >
          {translate("edit info")}
        </Button>
      </div>
      <div className={classes.detailContainer}>
        <Divider />

        <Typography variant="h6">{translate("user name")}</Typography>
        <Typography variant="subtitle1">
          {user.name ? user.name : "--"}@
        </Typography>
        <Divider />

        <Typography variant="h6">{translate("name")}</Typography>
        <Typography variant="subtitle1">
          {user.profile_name ? user.profile_name : "--"}
        </Typography>
        <Divider />
        <Typography variant="h6">{translate("biography")}</Typography>
        <Typography variant="subtitle1">
          {user.bio ? user.bio : "--"}
        </Typography>
        <Divider />
        <Typography variant="h6">{translate("phone number")}</Typography>
        <Typography variant="subtitle1">
          {user.phone_no ? user.phone_no : "--"}
        </Typography>
        <Divider />
        <Typography variant="h6">{translate("birth date")}</Typography>
        <Typography variant="subtitle1">
          {user.birth_date
            ? jMoment(user.birth_date, "YYYY/M/D").format("jYYYY/jM/jD")
            : "--"}
        </Typography>
        <Divider />
        <Typography variant="h6">{translate("account type")}</Typography>
        <Typography variant="subtitle1">
          {user.is_entity ? translate("employer") : translate("employee")}
        </Typography>
        <Divider />
        <Typography variant="h6">{translate("email")}</Typography>
        <Typography variant="subtitle1">
          {user.email ? user.email : "--"}
          <IconButton onClick={() => handleDialog("change email")}>
            <Edit />
          </IconButton>
        </Typography>
        <Divider />
        <Typography variant="h6">{translate("password")}</Typography>
        <Typography variant="subtitle1">
          ********
          <IconButton onClick={() => handleDialog("change password")}>
            <Edit />
          </IconButton>
        </Typography>
        <Divider />
        <Link
          style={{
            textDecoration: "none",
            marginTop: 20,
            padding: 10,
          }}
          onClick={() => logout()}
        >
          <Typography color="error" variant="h6">
            {translate("log out")}
          </Typography>
        </Link>
      </div>
      <Popup
        title={translate(childComponent)}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <ChildrenComponent value={childComponent} />
      </Popup>
    </div>
  ) : (
    <LinearProgress color="secondary" />
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { load_user, logout, update_avatar })(
  ProfileSetting
);
