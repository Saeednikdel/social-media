import React, { useState } from "react";
import {
  IconButton,
  makeStyles,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { load_posts } from "../actions/blog";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchSharp } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  noItemContainer: {
    textAlign: "center",
    marginTop: 140,
    marginBottom: 140,
  },
  loader: {
    textAlign: "center",
  },
  testField: { width: "100%" },
  form: { margin: 10 },
}));
const Search = ({ posts, load_posts, count }) => {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const fetchData = (e) => {
    e.preventDefault();
    load_posts(page, search);
    setPage(page + 1);
  };
  return (
    <div>
      <form
        autoComplete="off"
        classes={classes.form}
        onSubmit={(e) => fetchData(e)}
      >
        <TextField
          autoComplete="off"
          id="search"
          placeholder="جستجو"
          color="secondary"
          variant="outlined"
          className={classes.testField}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="small"
          InputProps={{
            endAdornment: (
              <IconButton color="inherit" size="small" type="submit">
                <SearchSharp />
              </IconButton>
            ),
          }}
        />
      </form>
      {posts && (
        <InfiniteScroll
          dataLength={posts.length}
          next={(e) => fetchData(e)}
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
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  posts: state.blog.search_posts,
  count: state.blog.search_count,
});
export default connect(mapStateToProps, {
  load_posts,
})(Search);
