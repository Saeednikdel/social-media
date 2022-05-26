import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import Notification from "../components/Notification";
import DialogAlert from "../components/DialogAlert";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { load_posts } from "../actions/blog";
import { NavLink, Link, useLocation } from "react-router-dom";
const useStyles = makeStyles((theme) => ({
  noItemContainer: {
    textAlign: "center",
    marginTop: 140,
    marginBottom: 140,
  },
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  paginatorDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: 20,
  },

  imageContainer: {
    position: "relative",
  },
  like: {
    position: "absolute",
    bottom: 15,
    right: 15,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));
const Home = ({ posts, load_posts, history, isAuthenticated }) => {
  const [openPopup, setOpenPopup] = useState(false);

  const [page, setPage] = useState(
    getQueryVariable("page") ? parseInt(getQueryVariable("page")) : 1
  );
  const classes = useStyles();
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    actionUrl: "",
    actionText: "",
  });
  const { search } = useLocation();
  useEffect(() => {
    if (parseInt(getQueryVariable("page")) !== page) setPage(1);

    fetchData();
  }, [search]);

  const fetchData = async () => {
    try {
      await load_posts(getQueryVariable("page"), getQueryVariable("keyword"));
    } catch (err) {}
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    const currentUrlParams = new URLSearchParams(window.location.search);
    currentUrlParams.set("page", value);
    history.push(window.location.pathname + "?" + currentUrlParams.toString());
    window.scrollTo({ top: 0, right: 0, behavior: "smooth" });
  };

  return (
    <div>
      {posts ? (
        <Grid container spacing={1} style={{ marginTop: 2 }}>
          {posts.posts.map((post) => (
            <Grid item xs={12}>
              <PostCard post={post} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={classes.noItemContainer}>
          <CircularProgress color="secondary" />
        </div>
      )}
      {posts && posts.posts.length < 1 && (
        <div className={classes.noItemContainer}>
          <Typography variant="h6">هیچ پستی پیدا نشد.</Typography>
        </div>
      )}
      <div className={classes.paginatorDiv}>
        {posts && posts.count > 1 && (
          <Pagination
            count={posts.count}
            page={page}
            color="secondary"
            onChange={handlePageChange}
          />
        )}
      </div>

      <Notification notify={notify} setNotify={setNotify} />
      <DialogAlert alert={alert} setAlert={setAlert} />
    </div>
  );
};
function getQueryVariable(variable) {
  var query = decodeURI(window.location.search.substring(1)).replace(
    /\+/g,
    " "
  );
  //console.log(query); //"app=article&act=news_content&aid=160990"
  var vars = query.split("&");
  //console.log(vars); //[ 'app=article', 'act=news_content', 'aid=160990' ]
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    //console.log(pair); //[ 'app', 'article' ][ 'act', 'news_content' ][ 'aid', '160990' ]
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
}
const mapStateToProps = (state) => ({
  posts: state.blog.posts,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {
  load_posts,
})(Home);
