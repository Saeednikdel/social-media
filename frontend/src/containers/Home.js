import React, { useEffect, useState } from "react";
import { Typography, makeStyles, CircularProgress } from "@material-ui/core";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { load_posts } from "../actions/blog";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  noItemContainer: {
    textAlign: "center",
    marginTop: 140,
    marginBottom: 140,
  },
  loader: {
    textAlign: "center",
  },
}));
const Home = ({ posts, load_posts, count }) => {
  const [page, setPage] = useState(2);
  const classes = useStyles();

  useEffect(() => {
    if (posts.length === 0) {
      load_posts(1, false);
    }
  }, []);
  const fetchData = async () => {
    await load_posts(page, false);
    setPage(page + 1);
  };
  return (
    <div>
      {posts ? (
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={count > posts.length}
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
          {posts.map((post) => (
            <PostCard post={post} />
          ))}
        </InfiniteScroll>
      ) : (
        <div className={classes.noItemContainer}>
          <CircularProgress color="secondary" />
        </div>
      )}
      {posts && posts.length < 1 && (
        <div className={classes.noItemContainer}>
          <Typography variant="h6">هیچ پستی پیدا نشد.</Typography>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.blog.posts,
  count: state.blog.count,
});
export default connect(mapStateToProps, {
  load_posts,
})(Home);
