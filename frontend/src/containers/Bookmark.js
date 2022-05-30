import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_bookmark, bookmark } from "../actions/auth";
import { makeStyles, CircularProgress } from "@material-ui/core";
import Redirect from "react-router-dom/es/Redirect";
import BookmarkCard from "../components/BookmarkCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  pageContainer: {
    marginTop: `${theme.spacing(2)}px`,
  },
  loader: {
    textAlign: "center",
  },
}));
const Bookmark = ({
  load_bookmark,
  bookmarkList,
  bookmark,
  bookmark_count,
  isAuthenticated,
}) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (bookmarkList.length === 0) {
      fetchData();
    }
  }, []);
  const fetchData = async () => {
    await load_bookmark(page);
    setPage(page + 1);
  };
  const classes = useStyles();
  if (isAuthenticated === false) return <Redirect to="/login" />;

  return bookmarkList ? (
    <div className={classes.pageContainer}>
      <InfiniteScroll
        dataLength={bookmarkList.length}
        next={fetchData}
        hasMore={bookmark_count > bookmarkList.length}
        loader={
          <div className={classes.loader}>
            <CircularProgress color="secondary" />
          </div>
        }
        endMessage={
          <div className={classes.loader}>
            <p>...</p>
          </div>
        }
      >
        {bookmarkList.map((post) => (
          <BookmarkCard post={post} />
        ))}
      </InfiniteScroll>
    </div>
  ) : (
    <CircularProgress color="secondary" />
  );
};
const mapStateToProps = (state) => ({
  bookmarkList: state.auth.bookmarks,
  bookmark_count: state.auth.bookmark_count,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { load_bookmark, bookmark })(Bookmark);
