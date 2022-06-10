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
    fontSize: 16,
  },
  avatar: { height: 50, width: 50, margin: 10 },
  avatarContainer: { display: "flex", alignItems: "center" },
  name: { display: "flex", alignItems: "center" },
  content: { minHeight: 70, paddingLeft: 70 },
}));

export default function PostCard({ post, job }) {
  const classes = useStyles();

  return (
    <Link
      className={classes.navLink}
      to={job ? `/job/${post.id}/` : `/post/${post.id}/`}
    >
      <div className={classes.avatarContainer}>
        <Link
          className={classes.navLink}
          exact
          to={`/profile/${post.user_name}/`}
        >
          <Avatar src={post.user_image} className={classes.avatar} />
        </Link>
        <div>
          <Link
            className={classes.navLink}
            exact
            to={`/profile/${post.user_name}/`}
          >
            <div className={classes.name}>
              <Typography variant="body1" color="textSecondary">
                {post.user_name}@
              </Typography>
              <Typography variant="body1" style={{ marginRight: 4 }}>
                {post.profile_name}
              </Typography>
              {post.user_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  style={{ height: 12, marginRight: 4 }}
                />
              )}
            </div>
          </Link>
          <Typography color="textSecondary" variant="body2">
            {jMoment(post.date, "YYYY/M/D").format("jYYYY/jM/jD")}
          </Typography>
        </div>
      </div>

      <CardContent className={classes.content}>
        <p
          className={classes.para}
          dangerouslySetInnerHTML={{ __html: linkify(post.text) }}
        />
      </CardContent>
      <Divider />
    </Link>
  );
}
