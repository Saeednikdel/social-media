import React, { useEffect, useState } from "react";
import {
  Card,
  Typography,
  Grid,
  makeStyles,
  LinearProgress,
  CircularProgress,
  Avatar,
  Button,
  IconButton,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Notification from "../components/Notification";
import DialogAlert from "../components/DialogAlert";
import { connect } from "react-redux";
import { load_profile, load_user_posts } from "../actions/blog";
import { follow_unfollw } from "../actions/auth";
import jMoment from "moment-jalaali";
import { useLocation, withRouter, Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { MailOutline } from "@material-ui/icons";
import axios from "axios";
import Redirect from "react-router-dom/es/Redirect";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
  },
  commentContainer: {
    marginTop: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
    minHeight: 250,
  },
  commentCard: {
    marginTop: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
    minHeight: 150,
  },
  paginatorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },

  avatar: {
    height: 100,
    width: 100,
    marginLeft: 40,
    marginTop: -50,
    border: "5px solid",
    borderColor: `${theme.palette.primary.border}`,
  },
  noItemContainer: {
    textAlign: "center",
    marginTop: 140,
    marginBottom: 140,
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));
const UserProfile = ({
  match,
  isAuthenticated,
  load_profile,
  profile,
  userposts,
  history,
  load_user_posts,
  follow_unfollw,
  user,
}) => {
  const [chatId, setChatId] = useState(false);
  const [page, setPage] = useState(
    getQueryVariable("page") ? parseInt(getQueryVariable("page")) : 1
  );
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    actionUrl: "",
    actionText: "",
  });
  const classes = useStyles();
  const userId = match.params.id;
  const { search } = useLocation();

  useEffect(() => {
    if (parseInt(getQueryVariable("page")) !== page) setPage(1);
    fetchData();
  }, [search, userId]);

  const fetchData = async () => {
    try {
      await load_profile(userId);
      await load_user_posts(userId, getQueryVariable("page"));
    } catch (err) {}
  };
  const handlePageChange = (event, value) => {
    setPage(value);
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", value);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
  };

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

  return profile ? (
    <>
      <Card variant="outlined">
        <img
          src="http://127.0.0.1:8000/media/header.jpg"
          style={{
            width: "100%",
            height: 200,
            objectFit: "cover",
          }}
        />
        <Avatar className={classes.avatar} src={profile.image} />
        <div className={classes.pageContainer}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              <Typography variant="h5">{profile.name}</Typography>
              <Typography color="textSecondary" variant="subtitle2">
                عضو از :
                {jMoment(profile.join_date, "YYYY/M/D").format("jYYYY/jM/jD")}
              </Typography>
            </div>
            {isAuthenticated && user.id !== profile.id && (
              <div
                style={{ flex: 1, display: "flex", justifyContent: "flex-end" }}
              >
                <IconButton
                  onClick={() => get_chat()}
                  style={{ marginLeft: 20 }}
                >
                  <MailOutline color="secondary" />
                </IconButton>

                <Button
                  color="secondary"
                  onClick={() => follow_unfollw(profile.id)}
                  style={{ marginLeft: 20 }}
                >
                  {profile.followed === true ? "آنفالو" : "فالو"}
                </Button>
              </div>
            )}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              style={{ margin: 10 }}
            >
              دنبال کننده : {profile.followers}
            </Typography>
            <Typography
              color="textSecondary"
              variant="subtitle2"
              style={{ margin: 10 }}
            >
              دنبال میکند : {profile.followings}
            </Typography>
          </div>
        </div>
      </Card>

      {userposts ? (
        <Grid container spacing={1} style={{ marginTop: 2 }}>
          {userposts.posts.map((post) => (
            <Grid item xs={12}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={classes.noItemContainer}>
          <CircularProgress color="secondary" />
        </div>
      )}
      {userposts && userposts.posts.length < 1 && (
        <div className={classes.noItemContainer}>
          <Typography variant="h6">هیچ پستی پیدا نشد.</Typography>
        </div>
      )}
      <div className={classes.paginatorDiv}>
        {userposts && userposts.count > 1 && (
          <Pagination
            count={userposts.count}
            page={page}
            color="secondary"
            onChange={handlePageChange}
          />
        )}
      </div>

      <Notification notify={notify} setNotify={setNotify} />
      <DialogAlert alert={alert} setAlert={setAlert} />
    </>
  ) : (
    <>
      <LinearProgress color="secondary" />
    </>
  );
};
function getQueryVariable(variable) {
  var query = decodeURI(window.location.search.substring(1)).replace(
    /\+/g,
    " "
  );
  //console.log(query); //"app=article&act=news_content&aid=160990"
  var vars = query.split("&");
  //console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    //console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
  profile: state.blog.profile,
  userposts: state.blog.userposts,
});
export default withRouter(
  connect(mapStateToProps, {
    load_profile,
    load_user_posts,
    follow_unfollw,
  })(UserProfile)
);
