import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_bookmark, bookmark } from "../actions/auth";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  makeStyles,
  Button,
  CircularProgress,
  Avatar,
} from "@material-ui/core";
import { NavLink, Link, useLocation } from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import jMoment from "moment-jalaali";

import { Visibility, Favorite } from "@material-ui/icons";
import { Rating, Pagination } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    margin: `${theme.spacing(2)}px`,
  },
  paginatorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },
  like: {
    position: "absolute",
    bottom: 15,
    right: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));
const Bookmark = ({
  load_bookmark,
  bookmarkList,
  bookmark,
  isAuthenticated,
}) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        await load_bookmark(page);
      } catch (err) {}
    };
    if (localStorage.getItem("id")) {
      fetchData();
    }
  }, []);
  const classes = useStyles();
  if (isAuthenticated === false) return <Redirect to="/login" />;

  const BookmarkHandle = (id) => {
    bookmark(id, page);
  };
  const handleChange = (event, value) => {
    setPage(value);
    load_bookmark(value);
    window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
  };
  return bookmarkList ? (
    <div className={classes.pageContainer}>
      <Grid container spacing={1} style={{ marginTop: 2 }}>
        {bookmarkList.bookmarks.map((post) => (
          <Grid item xs={12}>
            <Card variant="outlined">
              <CardActionArea
                component={NavLink}
                to={`/detail/${post.post_id}/`}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Link
                    className={classes.navLink}
                    exact
                    to={`/profile/${post.post_user_id}/`}
                  >
                    <Avatar
                      src={post.user_image}
                      style={{ height: 50, width: 50, margin: 10 }}
                    />
                  </Link>
                  <div>
                    <Link
                      className={classes.navLink}
                      exact
                      to={`/profile/${post.post_user_id}/`}
                    >
                      <Typography variant="body1">{post.user_name}</Typography>
                    </Link>
                    <Typography color="textSecondary" variant="body2">
                      {jMoment(post.post_date, "YYYY/M/D").format(
                        "jYYYY/jM/jD"
                      )}
                    </Typography>
                  </div>
                </div>

                <CardContent style={{ height: 160 }}>
                  <Typography variant="textSecondary" gutterBottom>
                    {post.post_content}...
                  </Typography>

                  <div className={classes.like}>
                    <Typography variant="body2">{post.post_like}</Typography>
                    <Favorite
                      color="error"
                      style={{ fontSize: 20, marginRight: 5 }}
                    />
                  </div>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      {bookmarkList.bookmarks.length < 1 && (
        <div style={{ textAlign: "center", marginTop: 120 }}>
          <Typography variant="h6">محصولی نشان نشده است.</Typography>
        </div>
      )}
      {bookmarkList && bookmarkList.count > 1 && (
        <div className={classes.paginatorDiv}>
          <Pagination
            count={bookmarkList.count}
            page={page}
            color="secondary"
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  ) : (
    <CircularProgress color="secondary" />
  );
};
const mapStateToProps = (state) => ({
  bookmarkList: state.auth.bookmarks,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { load_bookmark, bookmark })(Bookmark);
