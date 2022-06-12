import React, { useEffect, useState } from "react";
import {
  Typography,
  Avatar,
  makeStyles,
  Divider,
  CircularProgress,
  Button,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { load_job_requests } from "../actions/job";
import InfiniteScroll from "react-infinite-scroll-component";
import translate from "../translate";

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  avatar: {
    height: 50,
    width: 50,
  },
  loader: {
    textAlign: "center",
  },
}));
const RequestList = ({
  id,
  job_requests,
  requests_count,
  load_job_requests,
}) => {
  const [page, setPage] = useState(2);
  useEffect(() => {
    load_job_requests(id, 1);
    setPage(2);
  }, []);
  const fetchData = async () => {
    load_job_requests(id, page);
    setPage(page + 1);
  };
  const classes = useStyles();

  return (
    <div style={{ margin: 10 }}>
      <Typography color="secondary">{translate("sent resumes")}</Typography>
      {job_requests && (
        <InfiniteScroll
          dataLength={job_requests.length}
          next={fetchData}
          hasMore={requests_count > job_requests.length}
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
          {job_requests.map((item) => (
            <>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link className={classes.navLink} to={`/profile/${item.name}/`}>
                  <Avatar
                    src={item.image}
                    style={{ height: 50, width: 50, margin: 10 }}
                  />
                </Link>
                <Link className={classes.navLink} to={`/profile/${item.name}/`}>
                  <Typography variant="body1">{item.profile_name}</Typography>
                </Link>
                {item.is_verified && (
                  <img
                    src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                    style={{ height: 12, marginRight: 5 }}
                  />
                )}
                <div
                  style={{
                    display: "flex",
                    flexGrow: 1,
                    justifyContent: "flex-end",
                  }}
                >
                  <Link
                    className={classes.navLink}
                    to={`/job/${id}/resume/${item.id}`}
                  >
                    <Button color="secondary">{translate("see resume")}</Button>
                  </Link>
                </div>
              </div>
              <Divider />
            </>
          ))}
        </InfiniteScroll>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  requests_count: state.job.requests_count,
  job_requests: state.job.job_requests,
});
export default connect(mapStateToProps, { load_job_requests })(RequestList);
