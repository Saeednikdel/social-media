import React from "react";
import {
  CardContent,
  makeStyles,
  Typography,
  Avatar,
  Divider,
} from "@material-ui/core";
import { Favorite, PersonAddRounded, ChatRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";
import jMoment from "moment-jalaali";

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function NotifCard({ notif }) {
  const classes = useStyles();
  let msg = "";
  if (notif.kind === "F") {
    msg = " شما را فالو کرد ";
  } else if (notif.kind === "L") {
    msg = " پست شما را پسندید ";
  } else {
    msg = " روی پست شما نوشت ";
  }
  return (
    <Link
      className={classes.navLink}
      to={
        notif.kind === "F"
          ? `/profile/${notif.sender_name}/`
          : `/post/${notif.post}/`
      }
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {notif.kind === "L" && (
          <Favorite color="error" style={{ marginRight: 10 }} />
        )}
        {notif.kind === "F" && (
          <PersonAddRounded color="secondary" style={{ marginRight: 10 }} />
        )}
        {notif.kind === "C" && <ChatRounded style={{ marginRight: 10 }} />}
        <Link
          className={classes.navLink}
          exact
          to={`/profile/${notif.sender_name}/`}
        >
          <Avatar
            src={notif.sender_image}
            style={{ height: 50, width: 50, margin: 10 }}
          />
        </Link>
        <div>
          <Link
            className={classes.navLink}
            exact
            to={`/profile/${notif.sender_name}/`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">{notif.sender_name}@</Typography>
              {notif.user_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  style={{ height: 12, marginRight: 5, marginLeft: 5 }}
                />
              )}
              <Typography>{msg}</Typography>
            </div>
          </Link>
          <Typography color="textSecondary" variant="body2">
            {jMoment(notif.date, "YYYY/M/D HH:mm").format("jYYYY/jM/jD HH:mm")}
          </Typography>
        </div>
      </div>

      <CardContent></CardContent>
      <Divider />
    </Link>
  );
}
