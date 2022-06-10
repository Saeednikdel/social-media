import React from "react";
import { makeStyles, Typography, Avatar, Divider } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
}));

export default function UsersListCard({ user }) {
  const classes = useStyles();
  return (
    <Link className={classes.navLink} to={`/profile/${user.name}/`}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link className={classes.navLink} exact to={`/profile/${user.name}/`}>
          <Avatar
            src={user.image}
            style={{ height: 50, width: 50, margin: 10 }}
          />
        </Link>
        <div>
          <Link className={classes.navLink} exact to={`/profile/${user.name}/`}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="body1">{user.name}@</Typography>
              {user.is_verified && (
                <img
                  src={`${process.env.REACT_APP_API_URL}/media/verified.png`}
                  style={{ height: 12, marginRight: 5, marginLeft: 5 }}
                />
              )}
            </div>
          </Link>
        </div>
      </div>
      <Divider />
    </Link>
  );
}
