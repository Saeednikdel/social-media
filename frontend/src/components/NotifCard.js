import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Favorite } from "@material-ui/icons";
import { NavLink, Link } from "react-router-dom";
import jMoment from "moment-jalaali";

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
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
    <Card variant="outlined">
      <CardActionArea
        component={NavLink}
        to={
          notif.kind === "F"
            ? `/profile/${notif.sender_id}/`
            : `/detail/${notif.post}/`
        }
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link
            className={classes.navLink}
            exact
            to={`/profile/${notif.sender_id}/`}
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
              to={`/profile/${notif.sender_id}/`}
            >
              <Typography variant="body1">
                {notif.sender_name}
                {msg}
              </Typography>
            </Link>
            <Typography color="textSecondary" variant="body2">
              {jMoment(notif.date, "YYYY/M/D HH:mm").format(
                "jYYYY/jM/jD HH:mm"
              )}
            </Typography>
          </div>
        </div>

        <CardContent></CardContent>
      </CardActionArea>
    </Card>
  );
}
