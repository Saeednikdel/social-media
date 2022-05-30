import React, { useEffect, useState } from "react";
import { Typography, makeStyles, CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
import { load_notif } from "../actions/auth";
import NotifCard from "../components/NotifCard";
import InfiniteScroll from "react-infinite-scroll-component";

const useStyles = makeStyles((theme) => ({
  loader: {
    textAlign: "center",
  },
}));
const Messages = ({
  load_notif,
  isAuthenticated,
  notification,
  notif_count,
}) => {
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (notification.length === 0) {
      load_notif(1);
    }
  }, []);
  const fetchData = async () => {
    await load_notif(page);
    setPage(page + 1);
  };
  const classes = useStyles();
  if (isAuthenticated === false) return <Redirect to="/login" />;
  return (
    <>
      {notification && (
        <InfiniteScroll
          dataLength={notification.length}
          next={fetchData}
          hasMore={notif_count > notification.length}
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
          {notification.map((notif) => (
            <NotifCard notif={notif} />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  notification: state.auth.notification,
  notif_count: state.auth.notif_count,
});
export default connect(mapStateToProps, { load_notif })(Messages);
