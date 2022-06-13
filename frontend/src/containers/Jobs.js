import React, { useState, useEffect } from "react";
import {
  IconButton,
  makeStyles,
  CircularProgress,
  TextField,
  Toolbar,
} from "@material-ui/core";
import PostCard from "../components/PostCard";
import { connect } from "react-redux";
import { load_jobs } from "../actions/job";
import InfiniteScroll from "react-infinite-scroll-component";
import { SearchSharp } from "@material-ui/icons";
import translate from "../translate";

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
  textField: { width: "100%", maxWidth: 900 },
  form: {
    padding: 10,
    position: "fixed",
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: `${theme.palette.primary.border}`,
    textAlign: "center",
  },
}));
const Jobs = ({ jobs, load_jobs, count, history }) => {
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [search, setSearch] = useState(getQueryVariable("keyword"));
  useEffect(() => {
    load_jobs(1, getQueryVariable("keyword"));
    setPage(2);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    const currentUrlParams = new URLSearchParams();
    currentUrlParams.set("keyword", search);
    if (window.location.pathname === "/jobs") {
      history.push(
        window.location.pathname + "?" + currentUrlParams.toString()
      );
    } else {
      window.location.replace("/?keyword=" + search);
    }
    load_jobs(1, search);
    setPage(2);
  };
  const fetchData = async () => {
    await load_jobs(page, search);
    setPage(page + 1);
  };
  return (
    <div>
      <Toolbar />
      {jobs && (
        <InfiniteScroll
          dataLength={jobs.length}
          next={fetchData}
          hasMore={count > jobs.length}
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
          {jobs.map((job) => (
            <PostCard post={job} job={true} />
          ))}
        </InfiniteScroll>
      )}
      <div className={classes.form}>
        <Toolbar />
        <form autoComplete="off" onSubmit={(e) => submit(e)}>
          <TextField
            autoComplete="off"
            id="search"
            placeholder={translate("search")}
            color="secondary"
            variant="outlined"
            className={classes.textField}
            value={search ? search : ""}
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
};

const mapStateToProps = (state) => ({
  jobs: state.job.jobs,
  count: state.job.jobs_count,
});
export default connect(mapStateToProps, {
  load_jobs,
})(Jobs);
