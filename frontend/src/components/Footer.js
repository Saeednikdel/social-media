import React from "react";
///import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: 250,
    marginTop: `${theme.spacing(2)}px`,
  },
}));
function Footer() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}></div>
    </>
  );
}

export default Footer;
