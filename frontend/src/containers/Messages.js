import React, { useEffect, useRef, useState } from "react";
import { Typography, Avatar, makeStyles, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Redirect from "react-router-dom/es/Redirect";
import { load_rooms } from "../actions/message";

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  avatar: {
    height: 50,
    width: 50,
  },
}));
const Messages = ({ load_rooms, rooms, user, isAuthenticated }) => {
  useEffect(() => {
    load_rooms();
  }, []);
  const classes = useStyles();
  if (isAuthenticated === false) return <Redirect to="/login" />;

  const handleClick = () => {};

  return (
    <div>
      {rooms &&
        rooms.map((room) => (
          <>
            <div style={{ display: "flex", alignItems: "center", margin: 10 }}>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  rooms: state.message.rooms,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, { load_rooms })(Messages);
