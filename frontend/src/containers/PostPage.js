import React, { useEffect, useState } from "react";
import {
  Divider,
  Typography,
  Grid,
  makeStyles,
  IconButton,
  LinearProgress,
  Avatar,
  Menu,
  MenuItem,
} from "@material-ui/core";
import {
  BookmarkBorder,
  Bookmark,
  FavoriteBorder,
  Favorite,
  MoreVert,
} from "@material-ui/icons";
import DialogAlert from "../components/DialogAlert";
import { connect } from "react-redux";
import { load_post, load_replies, like, load_likes } from "../actions/blog";
import { bookmark } from "../actions/blog";
import jMoment from "moment-jalaali";
import { Link, withRouter, useHistory } from "react-router-dom";
import linkify from "../utils/linkify";
import translate from "../translate";
import { RWebShare } from "react-web-share";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
  },
  emptyDiv: {
    textAlign: "center",
    height: 600,
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  para: {
    fontSize: 17,
  },
}));
const PostPage = ({
  post,
  likes,
  load_post,
  load_likes,
  match,
  isAuthenticated,
  bookmark,
  like,
  user,
}) => {
  const classes = useStyles();
  const postId = match.params.postId;
  const history = useHistory();

  const [openMenu, setOpenMenu] = useState(null);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    actionUrl: "",
    actionText: "",
  });
  useEffect(() => {
    load_post(postId);
    load_likes(postId, 1);
    //load_replies(itemId, 1);
    window.scrollTo(0, 0);
  }, [postId]);
  const BookmarkHandle = (id) => {
    if (isAuthenticated === true) {
      bookmark(id, false);
    } else {
      setAlert({
        isOpen: true,
        title: "!",
        message: translate("please log in or sign up"),
        actionUrl: "/login",
        actionText: translate("log in"),
      });
    }
  };
  const LikeHandle = (id) => {
    if (isAuthenticated === true) {
      like(id);
    } else {
      setAlert({
        isOpen: true,
        title: "!",
        message: translate("please log in or sign up"),
        actionUrl: "/login",
        actionText: translate("log in"),
      });
    }
  };
  const DeleteHandle = (id) => {
    setOpenMenu(null);
    if (isAuthenticated === true) {
      remove();
    } else {
      setAlert({
        isOpen: true,
        title: "!",
        message: translate("please log in or sign up"),
        actionUrl: "/login",
        actionText: translate("log in"),
      });
    }
  };
  return post && post.id == postId ? (
    <>
      <Grid container>
        <Grid xs={12} sm={6}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Link
              className={classes.navLink}
              exact
              to={`/profile/${post.user_name}/`}
            >
              <Avatar
                style={{ height: 50, width: 50, margin: 10 }}
                src={post.user_image}
              />
            </Link>
            <div>
              <Link
                className={classes.navLink}
                exact
                to={`/profile/${post.user_name}/`}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body1" color="textSecondary">
                    {post.user_name}@
                  </Typography>
                  <Typography variant="body1" style={{ marginRight: 4 }}>
                    {post.profile_name}
                  </Typography>
                  {post.user_verified && (
                    <img
                      src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                      style={{ height: 12, marginRight: 4 }}
                    />
                  )}
                </div>
              </Link>
              <Typography color="textSecondary" variant="subtitle2">
                {jMoment(post.date, "YYYY/M/D").format("jYYYY/jM/jD")}
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid xs={12} sm={6}>
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              className={classes.navLink}
              exact
              to={`/list/like/${post.id}/`}
            >
              <IconButton>
                <Typography color="textSecondary" variant="h6">
                  {post.like_count}
                </Typography>
              </IconButton>
              <IconButton>
                {likes &&
                  likes
                    .slice(0, 3)
                    .reverse()
                    .map((like) => (
                      <Avatar
                        src={like.image}
                        style={{ height: 25, width: 25, marginLeft: -8 }}
                      />
                    ))}
              </IconButton>
            </Link>
            <IconButton onClick={() => LikeHandle(post.id)}>
              {post.liked ? (
                <Favorite color="error" style={{ fontSize: 25 }} />
              ) : (
                <FavoriteBorder color="error" style={{ fontSize: 25 }} />
              )}
            </IconButton>
            <IconButton
              color="secondary"
              onClick={() => BookmarkHandle(post.id)}
            >
              {post.bookmarked ? (
                <Bookmark style={{ fontSize: 25 }} />
              ) : (
                <BookmarkBorder style={{ fontSize: 25 }} />
              )}
            </IconButton>

            <IconButton
              aria-label="More"
              aria-owns={Boolean(openMenu) ? "menu" : undefined}
              aria-haspopup="true"
              onClick={(e) => setOpenMenu(e.currentTarget)}
            >
              <MoreVert style={{ fontSize: 25 }} />
            </IconButton>
            <Menu
              id="menu"
              anchorEl={openMenu}
              open={Boolean(openMenu)}
              onClose={() => setOpenMenu(null)}
              PaperProps={{
                style: {
                  width: 150,
                },
              }}
            >
              {user && user.id == post.user && (
                <MenuItem onClick={() => DeleteHandle()}>
                  {translate("delete")}
                </MenuItem>
              )}
              <MenuItem onClick={() => setOpenMenu(null)}>
                {translate("report")}
              </MenuItem>
              <RWebShare
                data={{
                  // text: "Profile app",
                  url: `${process.env.REACT_APP_API_URL}/post/${postId}`,
                  // title: "post",
                }}
              >
                <MenuItem onClick={() => setOpenMenu(null)}>
                  {translate("share")}
                </MenuItem>
              </RWebShare>
            </Menu>
          </div>
        </Grid>
      </Grid>

      <div className={classes.summery}>
        <p
          className={classes.para}
          dangerouslySetInnerHTML={{ __html: linkify(post.content) }}
        />
      </div>

      <Divider />

      <DialogAlert alert={alert} setAlert={setAlert} />
    </>
  ) : (
    <>
      <LinearProgress color="secondary" />
      <div className={classes.emptyDiv}></div>
    </>
  );
  async function remove() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const user = localStorage.getItem("id");
      const body = JSON.stringify({
        user,
        id: postId,
      });
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/blog/post-remove/`,
          body,
          config
        );
        history.push("/");
      } catch (err) {}
    }
  }
};

const mapStateToProps = (state) => ({
  post: state.blog.post,
  likes: state.blog.likes,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default withRouter(
  connect(mapStateToProps, {
    load_post,
    load_likes,
    bookmark,
    like,
    load_replies,
  })(PostPage)
);
