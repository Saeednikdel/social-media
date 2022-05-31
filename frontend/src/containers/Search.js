import React, { useState } from "react";
import {
  IconButton,
  makeStyles,
  CircularProgress,
  TextField,
  Divider,
  Toolbar,
} from "@material-ui/core";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { load_posts } from "../actions/blog";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchSharp } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
  textField: { width: "100%" },
  form: {
    padding: 10,
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: `${theme.palette.primary.border}`,
  },
}));
const Search = ({ posts, load_posts, count }) => {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [search, setSearch] = useState("");

  const fetchData = (e, source) => {
    e.preventDefault();
    if (source === "scroll") {
      load_posts(page, search);
      setPage(page + 1);
    } else {
      load_posts(1, search);
      setPage(2);
    }
  };
  return (
    <div>
      <Toolbar />
      {posts && (
        <InfiniteScroll
          dataLength={posts.length}
          next={(e) => fetchData(e, "scroll")}
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
      <div className={classes.form}>
        <Toolbar />
        <form autoComplete="off" onSubmit={(e) => fetchData(e, "form")}>
          <TextField
            autoComplete="off"
            id="search"
            placeholder="جستجو"
            color="secondary"
            variant="outlined"
            className={classes.textField}
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
      </div>
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
