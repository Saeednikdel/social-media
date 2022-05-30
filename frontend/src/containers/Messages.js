import React, { useEffect, useRef, useState } from "react";
import {
  Typography,
  Avatar,
  makeStyles,
  Divider,
  CircularProgress,
} from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import { load_rooms } from "../actions/message";
import InfiniteScroll from "react-infinite-scroll-component";

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
const Messages = ({ load_rooms, rooms, user, isAuthenticated, room_count }) => {
  const [page, setPage] = useState(2);

  useEffect(() => {
    if (rooms.length === 0) {
      load_rooms(1);
    }
  }, []);
  const fetchData = async () => {
    await load_rooms(page);
    setPage(page + 1);
  };
  const classes = useStyles();
  if (isAuthenticated === false) return <Redirect to="/login" />;
  return (
    <>
      {rooms && (
        <InfiniteScroll
          dataLength={rooms.length}
          next={fetchData}
          hasMore={room_count > rooms.length}
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
          {rooms.map((room) => (
            <>
              <div
                style={{ display: "flex", alignItems: "center", margin: 10 }}
              >
                <Link exact to={`/chat/${room.id}/`}>
                  {room.users_list.map(
                    (chatuser) =>
                      chatuser.id !== user.id && (
                        <Avatar
                          src={chatuser.image}
                          style={{ width: 50, height: 50, margin: 10 }}
                        />
                      )
                  )}
                </Link>
                <div>
                  <Typography variant="body1">
                    {room.users_list.map((u) => u.id !== user.id && u.name)}
                  </Typography>
                </div>
              </div>
              <Divider />
            </>
          ))}
        </InfiniteScroll>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  rooms: state.message.rooms,
  room_count: state.message.room_count,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { load_rooms })(Messages);
