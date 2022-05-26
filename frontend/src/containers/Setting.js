import React, { useEffect, useState } from "react";
import {
  Avatar,
  Typography,
  Divider,
  LinearProgress,
  IconButton,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import { load_user, update_avatar } from "../actions/auth";
import jMoment from "moment-jalaali";
import { logout } from "../actions/auth";
import { Link } from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import { Edit } from "@material-ui/icons";
import SetEmail from "../containers/SetEmail";
import SetPassword from "../containers/SetPassword";
import Popup from "../components/Popup";
import SetUserDetail from "../containers/SetUserDetail";
import axios from "axios";

const Setting = ({
  user,
  load_user,
  logout,
  isAuthenticated,
  update_avatar,
}) => {
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
  if (isAuthenticated === false) return <Redirect to="/login" />;

  const handleDialog = (btnname) => {
    setchildComponent(btnname);
    setOpenPopup(true);
  };

  function ChildrenComponent({ value }) {
    switch (value) {
      case "ویرایش مشخصات":
        return (
          <SetUserDetail
            propsid={user.id}
            propsname={user.name}
            propsphone_no={user.phone_no}
            propsbirth_date={user.birth_date}
            setOpenPopup={setOpenPopup}
          />
        );
      case "تغییر ایمیل":
        return <SetEmail setOpenPopup={setOpenPopup} />;
      case "تغییر رمز عبور":
        return <SetPassword setOpenPopup={setOpenPopup} />;
    }
  }
  async function uploadImage(e) {
    const image = e.target.files[0];
    update_avatar(image);
  }
  return user ? (
    <div>
      <Button
        style={{ margin: 20 }}
        color="secondary"
        variant="outlined"
        onClick={() => handleDialog("ویرایش مشخصات")}
      >
        ویرایش مشخصات
      </Button>
      <label style={{ marginTop: 20 }} htmlFor="contained-button-file">
        <input
          accept="image/*"
          id="contained-button-file"
          // multiple
          style={{ display: "none" }}
          type="file"
          onChange={uploadImage}
        />

        <Avatar src={user.image} />
      </label>
      <Typography variant="h6">ایمیل</Typography>
      <Typography variant="subtitle1">
        {user.email ? user.email : "--"}
        <IconButton onClick={() => handleDialog("تغییر ایمیل")}>
          <Edit />
        </IconButton>
      </Typography>
      <Divider />
      <Typography variant="h6">نام</Typography>
      <Typography variant="subtitle1">
        {user.name ? user.name : "--"}
      </Typography>
      <Divider />
      <Typography variant="h6">تلفن</Typography>
      <Typography variant="subtitle1">
        {user.phone_no ? user.phone_no : "--"}
      </Typography>
      <Divider />
      <Typography variant="h6">تاریخ تولد</Typography>
      <Typography variant="subtitle1">
        {user.birth_date
          ? jMoment(user.birth_date, "YYYY/M/D").format("jYYYY/jM/jD")
          : "--"}
      </Typography>
      <Divider />
      <Typography variant="h6">رمز عبور</Typography>
      <Typography variant="subtitle1">
        ******
        <IconButton onClick={() => handleDialog("تغییر رمز عبور")}>
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
          خروج
        </Typography>
      </Link>
      <Popup
        title={childComponent}
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
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { load_user, logout, update_avatar })(
  Setting
);
