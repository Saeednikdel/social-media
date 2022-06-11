import React, { useEffect, useState } from "react";
import {
  Divider,
  Typography,
  makeStyles,
  LinearProgress,
  Avatar,
  Button,
  IconButton,
  Tabs,
  Tab,
} from "@material-ui/core";
import { connect } from "react-redux";
import { load_profile } from "../actions/blog";
import { follow_unfollw } from "../actions/auth";
import jMoment from "moment-jalaali";
import { withRouter, Link, NavLink } from "react-router-dom";
import { MailOutline } from "@material-ui/icons";
import axios from "axios";
import Redirect from "react-router-dom/es/Redirect";
import UserPostList from "./UserPostList";
import UserJobList from "./UserJobList";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
  },
  avatar: {
    height: 90,
    width: 90,
    marginLeft: 40,
    marginTop: -50,
    border: "4px solid",
    borderColor: `${theme.palette.primary.border}`,
  },

  navLink: {
    textDecoration: "none",
    color: "inherit",
    padding: 10,
  },
  buttonContainer: {
    flex: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  navLinkFollower: {
    textDecoration: "none",
    color: "inherit",
    marginRight: 20,
    marginTop: 20,
  },
}));
const UserProfile = ({
  match,
  isAuthenticated,
  load_profile,
  profile,
  follow_unfollw,
  user,
}) => {
  const [chatId, setChatId] = useState(false);
  const [tab, setTab] = useState("posts");
  const classes = useStyles();
  const userName = match.params.name;

  const tabList = [
    {
      label: "پست ها",
      value: "posts",
    },
    {
      label: "شغل ها",
      value: "jobs",
    },
  ];
  function Component({ value }) {
    switch (value) {
      case "posts":
        return <UserPostList userName={userName} />;
      case "jobs":
        return <UserJobList userName={userName} />;
      default:
        return <h1>not found</h1>;
    }
  }
  useEffect(() => {
    load_profile(userName);
  }, [userName]);

  async function get_chat() {
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/message/getroom/${user.id}/${profile.id}/`,
        config
      );
      setChatId(res.data.room_id);
    } catch (err) {
      console.error(err);
    }
  }
  if (chatId !== false) return <Redirect to={`/chat/${chatId}/`} />;

  return profile && profile.name == userName ? (
    <>
      <img
        src={
          profile.header || `${process.env.REACT_APP_API_URL}/media/header.jpg`
        }
        style={{
          width: "100%",
          height: 150,
          objectFit: "cover",
        }}
        onError={(e) => {
          e.target.src = `${process.env.REACT_APP_API_URL}/media/header.jpg`;
        }}
      />
      <Avatar className={classes.avatar} src={profile.image} />
      <div className={classes.pageContainer}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h5">{profile.profile_name}</Typography>

              {profile.is_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  style={{ height: 18, marginRight: 10 }}
                />
              )}
            </div>
            <Typography variant="body1" color="textSecondary">
              {profile.name}@
            </Typography>
            <Typography color="textSecondary" variant="subtitle2">
              عضو از :
              {jMoment(profile.join_date, "YYYY/M/D").format("jYYYY/jM/jD")}
            </Typography>
          </div>
          <div className={classes.buttonContainer}>
            {isAuthenticated && user.id !== profile.id && (
              <>
                <IconButton
                  onClick={() => get_chat()}
                  style={{ marginLeft: 10 }}
                >
                  <MailOutline color="secondary" />
                </IconButton>

                <Button
                  color="secondary"
                  onClick={() => follow_unfollw(userName)}
                  style={{ marginLeft: 10 }}
                >
                  {profile.followed === true ? "آنفالو" : "فالو"}
                </Button>
              </>
            )}
            {isAuthenticated && user.id === profile.id && (
              <Link className={classes.navLink} to="/setting/profile">
                <Typography color="secondary" variant="body1">
                  ویرایش پروفایل
                </Typography>
              </Link>
            )}
          </div>
        </div>
        {profile.bio && (
          <Typography style={{ marginTop: 10 }}>{profile.bio}</Typography>
        )}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            className={classes.navLinkFollower}
            to={`/list/follower/${userName}`}
          >
            <Typography color="textSecondary" variant="subtitle2">
              دنبال کننده : {profile.followers}
            </Typography>
          </Link>
          <Link
            className={classes.navLinkFollower}
            to={`/list/following/${userName}`}
          >
            <Typography color="textSecondary" variant="subtitle2">
              دنبال میکند : {profile.followings}
            </Typography>
          </Link>
        </div>
      </div>
      <Divider />
      <div>
        {profile.is_entity && (
          <Tabs value={tab} indicatorColor="primary" textColor="primary">
            {tabList.map((t) => (
              <Tab
                style={{ flexGrow: 1 }}
                label={t.label}
                value={t.value}
                onClick={() => setTab(t.value)}
              />
            ))}
          </Tabs>
        )}
        <Component value={tab} />
      </div>
    </>
  ) : (
    <>
      <LinearProgress color="secondary" />
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  profile: state.blog.profile,
});
export default withRouter(
  connect(mapStateToProps, {
    load_profile,
    follow_unfollw,
  })(UserProfile)
);
