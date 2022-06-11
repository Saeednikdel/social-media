import React, { useEffect, useState } from "react";
import { makeStyles, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { load_user_posts } from "../actions/blog";
import { withRouter } from "react-router-dom";
import PostCard from "../components/PostCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
}));
const UserPostList = ({ userName, userposts, load_user_posts, count }) => {
  const [page, setPage] = useState(2);

  const classes = useStyles();

  useEffect(() => {
    load_user_posts(userName, 1);
    setPage(2);
  }, [userName]);

  const fetchData = async () => {
    await load_user_posts(userName, page);
    setPage(page + 1);
  };

  return (
    <>
      {userposts && (
        <InfiniteScroll
          dataLength={userposts.length}
          next={fetchData}
          hasMore={count > userposts.length}
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
          {userposts.map((post) => (
            <PostCard post={post} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  userposts: state.blog.userposts,
  count: state.blog.profile_count,
});
export default withRouter(
  connect(mapStateToProps, {
    load_user_posts,
  })(UserPostList)
);
