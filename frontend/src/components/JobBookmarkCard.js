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
}));

export default function JobBookmarkCard({ job }) {
  const classes = useStyles();

  return (
    <Link className={classes.navLink} to={`/job/${job.job_id}/`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link
          className={classes.navLink}
          exact
          to={`/profile/${job.user_name}/`}
        >
          <Avatar
            src={job.user_image}
            style={{ height: 50, width: 50, margin: 10 }}
          />
        </Link>
        <div>
          <Link
            className={classes.navLink}
            exact
            to={`/profile/${job.user_name}/`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1" color="textSecondary">
                {job.user_name}@
              </Typography>
              <Typography variant="body1" style={{ marginRight: 4 }}>
                {job.profile_name}
              </Typography>
              {job.user_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  style={{ height: 12, marginRight: 5 }}
                />
              )}
            </div>
          </Link>
          <Typography color="textSecondary" variant="body2">
            {jMoment(job.job_date, "YYYY/M/D").format("jYYYY/jM/jD")}
          </Typography>
        </div>
      </div>

      <CardContent style={{ minHeight: 70, paddingRight: 70 }}>
        <p
          className={classes.para}
          dangerouslySetInnerHTML={{ __html: linkify(job.job_content) }}
        />
      </CardContent>
      <Divider />
    </Link>
  );
}
