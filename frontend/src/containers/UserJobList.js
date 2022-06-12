import React, { useEffect, useState } from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { load_user_jobs } from "../actions/job";
import { withRouter } from "react-router-dom";
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
}));
const UserJobList = ({ userName, userjobs, load_user_jobs, count }) => {
  const [page, setPage] = useState(2);

  const classes = useStyles();

  useEffect(() => {
    load_user_jobs(userName, 1);
    setPage(2);
  }, [userName]);

  const fetchData = async () => {
    await load_user_jobs(userName, page);
    setPage(page + 1);
  };

  return (
    <>
      {userjobs && (
        <InfiniteScroll
          dataLength={userjobs.length}
          next={fetchData}
          hasMore={count > userjobs.length}
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
          {userjobs.map((job) => (
            <PostCard post={job} job={true} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userjobs: state.job.userjobs,
  count: state.job.user_job_count,
});
export default withRouter(
  connect(mapStateToProps, {
    load_user_jobs,
  })(UserJobList)
);
