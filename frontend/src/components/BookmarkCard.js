import React from "react";
import {
  Divider,
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

export default function BookmarkCard({ post }) {
  const classes = useStyles();
  return (
    <CardActionArea component={NavLink} to={`/detail/${post.post_id}/`}>
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
            {jMoment(post.post_date, "YYYY/M/D").format("jYYYY/jM/jD")}
          </Typography>
        </div>
      </div>

      <CardContent style={{ minHeight: 70, paddingRight: 70 }}>
        <Typography variant="textSecondary" gutterBottom>
          {post.post_content}...
        </Typography>

        {/* <div className={classes.like}>
          <Typography variant="body2">{post.post_like}</Typography>
          <Favorite color="error" style={{ fontSize: 30, marginRight: 5 }} />
        </div> */}
      </CardContent>
      <Divider />
    </CardActionArea>
  );
}
