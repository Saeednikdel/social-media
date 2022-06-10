import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { load_bookmark } from "../actions/job";
import { makeStyles, CircularProgress } from "@material-ui/core";
import JobBookmarkCard from "../components/JobBookmarkCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
}));
const JobBookmark = ({ load_bookmark, bookmarkList, bookmark_count }) => {
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
        {bookmarkList.map((job) => (
          <JobBookmarkCard job={job} />
        ))}
      </InfiniteScroll>
    </div>
  ) : (
    <CircularProgress color="secondary" />
  );
};
const mapStateToProps = (state) => ({
  bookmarkList: state.job.bookmarks,
  bookmark_count: state.job.bookmark_count,
});
export default connect(mapStateToProps, { load_bookmark })(JobBookmark);
