import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_bookmark, bookmark } from "../actions/auth";
import {
  Typography,
  Grid,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import Redirect from "react-router-dom/es/Redirect";
import BookmarkCard from "../components/BookmarkCard";
import { Pagination } from "@material-ui/lab";

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
            <BookmarkCard post={post} />
          </Grid>
        ))}
      </Grid>
      {bookmarkList.bookmarks.length < 1 && (
        <div style={{ textAlign: "center", marginTop: 120 }}>
          <Typography variant="h6">هیچ پستی ذخیره نشده است.</Typography>
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
