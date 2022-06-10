import React, { useEffect, useState } from "react";
import {
  Divider,
  Typography,
  Grid,
  makeStyles,
  IconButton,
  LinearProgress,
  Avatar,
} from "@material-ui/core";
import {
  BookmarkBorder,
  Bookmark,
  FavoriteBorder,
  Favorite,
} from "@material-ui/icons";
import DialogAlert from "../components/DialogAlert";
import { connect } from "react-redux";
import { load_post, load_replies, like, load_likes } from "../actions/blog";
import { bookmark } from "../actions/blog";
import jMoment from "moment-jalaali";
import { Link, withRouter } from "react-router-dom";
import linkify from "../utils/linkify";

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
  paper: {
    height: 250,
  },
  summery: {
    margin: `${theme.spacing(2)}px`,
  },
  collapseTitle: { flex: 1 },
  paginatorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  emptyDiv: {
    textAlign: "center",
    height: 600,
  },
  carousel: { height: 400 },
  off: {
    backgroundColor: "#f44336",
    borderRadius: 15,
    color: "#fff",
    paddingRight: 8,
    paddingLeft: 8,
    display: "inline-block",
    margin: 10,
  },
  discountPrice: {
    display: "inline-block",
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
  load_replies,
}) => {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const postId = match.params.postId;
  const [openPopup, setOpenPopup] = useState(false);
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
  const AddCommentHandle = () => {
    if (isAuthenticated === true) {
      setOpenPopup(true);
    } else {
      setAlert({
        isOpen: true,
        title: "!",
        message: "لطفا وارد شوید یا ثبت نام کنید.",
        actionUrl: "/login",
        actionText: "ورود",
      });
    }
  };
  const BookmarkHandle = (id) => {
    if (isAuthenticated === true) {
      bookmark(id, false);
    } else {
      setAlert({
        isOpen: true,
        title: "!",
        message: "لطفا وارد شوید یا ثبت نام کنید.",
        actionUrl: "/login",
        actionText: "ورود",
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
        message: "لطفا وارد شوید یا ثبت نام کنید.",
        actionUrl: "/login",
        actionText: "ورود",
      });
    }
  };
  const [expand, setExpand] = React.useState({
    detail: false,
    summery: false,
  });
  const { detail, summery } = expand;
  const handleExpandClick = (name) => {
    if (name === "detail") {
      setExpand({
        detail: !detail,
        summery: false,
      });
    } else {
      setExpand({
        detail: false,
        summery: !summery,
      });
    }
  };
  const handleChange = (event, value) => {
    setPage(value);
    load_replies(postId, value);
  };

  return post ? (
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
                        src={like.user_image}
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

      {/* <Card className={classes.commentContainer}>
        <Button
          color='secondary'
          variant='outlined'
          onClick={() => AddCommentHandle()}>
          ثبت نظر
        </Button>
        <Grid container spacing={1}>
          {comments &&
            comments.comments.length > 0 &&
            comments.comments.map((comment) => (
              <Grid item xs={12} md={6}>
                <Card variant='outlined' className={classes.commentCard}>
                  <Typography color='textSecondary' variant='subtitle2'>
                    {jMoment(comment.date, "YYYY/M/D").format("jYYYY/jM/jD")}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {comment.user_name}
                  </Typography>
                  <Typography variant='body1'>{comment.title}</Typography>
                  <Rating name='read-only' value={comment.star} readOnly />
                  <Typography variant='body1'>{comment.description}</Typography>
                </Card>
              </Grid>
            ))}
        </Grid>
        {comments && comments.count > 1 && (
          <div className={classes.paginatorDiv}>
            <Pagination
              count={comments.count}
              page={page}
              color='secondary'
              onChange={handleChange}
            />
          </div>
        )}
      </Card>
      <Notification notify={notify} setNotify={setNotify} />
      
      <Popup
        title={"ثبت نظر"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}>
        <SetComment id={post.id} setOpenPopup={setOpenPopup} />
      </Popup> */}
      <DialogAlert alert={alert} setAlert={setAlert} />
    </>
  ) : (
    <>
      <LinearProgress color="secondary" />
      <div className={classes.emptyDiv}></div>
    </>
  );
};

const mapStateToProps = (state) => ({
  post: state.blog.post,
  likes: state.blog.likes,
  //comments: state.shop.comments,
  isAuthenticated: state.auth.isAuthenticated,
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
