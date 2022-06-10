import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_bookmark } from "../actions/blog";
import { makeStyles, CircularProgress } from "@material-ui/core";
import BookmarkCard from "../components/BookmarkCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
}));
const PostBookmark = ({ load_bookmark, bookmarkList, bookmark_count }) => {
  const [page, setPage] = useState(2);

  useEffect(() => {
    load_bookmark(1);
    setPage(2);
  }, []);
  const fetchData = async () => {
    await load_bookmark(page);
    setPage(page + 1);
  };
  const classes = useStyles();

  return bookmarkList ? (
    <div>
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
  bookmarkList: state.blog.bookmarks,
  bookmark_count: state.blog.bookmark_count,
});
export default connect(mapStateToProps, { load_bookmark })(PostBookmark);
