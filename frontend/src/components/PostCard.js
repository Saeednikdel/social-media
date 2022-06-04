import React from "react";
import {
  Divider,
  CardContent,
  makeStyles,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import jMoment from "moment-jalaali";
import linkify from "../utils/linkify";
const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  para: {
    fontSize: 17,
  },
}));

export default function PostCard({ post }) {
  const classes = useStyles();
  const stopEvent = (event) => event.stopPropagation();
  return (
    <Link className={classes.navLink} to={`/detail/${post.id}/`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          className={classes.navLink}
          exact
          to={`/profile/${post.user_name}/`}
        >
          <Avatar
            src={post.user_image}
            style={{ height: 50, width: 50, margin: 10 }}
          />
        </Link>
        <div>
          <Link
            className={classes.navLink}
            exact
            to={`/profile/${post.user_name}/`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">{post.user_name}@</Typography>
              {post.user_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  style={{ height: 12, marginRight: 5 }}
                />
              )}
            </div>
          </Link>
          <Typography color="textSecondary" variant="body2">
            {jMoment(post.date, "YYYY/M/D").format("jYYYY/jM/jD")}
          </Typography>
        </div>
      </div>

      <CardContent style={{ minHeight: 70, paddingRight: 70 }}>
        <p
          className={classes.para}
          dangerouslySetInnerHTML={{ __html: linkify(post.text) }}
        />
      </CardContent>
      <Divider />
    </Link>
  );
}
