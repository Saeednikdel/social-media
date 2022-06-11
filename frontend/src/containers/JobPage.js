import React, { useEffect, useState } from "react";
import {
  Divider,
  Typography,
  Grid,
  makeStyles,
  IconButton,
  Avatar,
  Button,
} from "@material-ui/core";
import { BookmarkBorder, Bookmark } from "@material-ui/icons";
import DialogAlert from "../components/DialogAlert";
import Notification from "../components/Notification";
import { connect } from "react-redux";
import { load_job } from "../actions/job";
import { bookmark_job } from "../actions/job";
import jMoment from "moment-jalaali";
import { Link, withRouter } from "react-router-dom";
import linkify from "../utils/linkify";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  commentContainer: {
    marginTop: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
    minHeight: 250,
  },
  commentCard: {
    marginTop: `${theme.spacing(2)}px`,
    padding: `${theme.spacing(2)}px`,
    minHeight: 150,
  },

  emptyDiv: {
    textAlign: "center",
    height: 600,
  },

  navLink: {
    textDecoration: "none",
    color: "inherit",
  },
  para: {
    fontSize: 17,
  },
}));
const JobPage = ({
  job,
  load_job,
  match,
  isAuthenticated,
  bookmark_job,
  user,
}) => {
  const classes = useStyles();
  const jobId = match.params.jobId;
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
    actionUrl: "",
    actionText: "",
  });
  useEffect(() => {
    load_job(jobId);
    window.scrollTo(0, 0);
  }, [jobId]);

  const BookmarkHandle = (id) => {
    if (isAuthenticated === true) {
      bookmark_job(id, false);
    } else {
      setAlert({
        isOpen: true,
        title: "!",
        message: "لطفا وارد شوید یا ثبت نام کنید.",
        actionUrl: "/login",
        actionText: "ورود",
      });
    }
  };

  async function send() {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const body = JSON.stringify({ user: user.id, id: job.id });
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/jobs/send-resume/`,
        body,
        config
      );
      if (res.data.message === "resume sent") {
        setNotify({
          isOpen: true,
          message: "رزومه ارسال شد.",
          type: "success",
        });
      } else if (res.data.message === "allready sent") {
        setNotify({
          isOpen: true,
          message: "رزومه قبلا ارسال شده.",
          type: "info",
        });
      }
    } catch (err) {
      setNotify({
        isOpen: true,
        message: "رزومه ارسال نشد.",
        type: "error",
      });
    }
  }
  return (
    <>
      {job && (
        <>
          <Grid container>
            <Grid xs={12} sm={6}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Link
                  className={classes.navLink}
                  exact
                  to={`/profile/${job.user_name}/`}
                >
                  <Avatar
                    style={{ height: 50, width: 50, margin: 10 }}
                    src={job.user_image}
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
                          style={{ height: 12, marginRight: 4 }}
                        />
                      )}
                    </div>
                  </Link>
                  <Typography color="textSecondary" variant="subtitle2">
                    {jMoment(job.date, "YYYY/M/D").format("jYYYY/jM/jD")}
                  </Typography>
                </div>
              </div>
            </Grid>
            <Grid xs={12} sm={6}>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                {user && user.id !== job.user && (
                  <Button color="secondary" onClick={() => send()}>
                    ارسال رزومه
                  </Button>
                )}
                <IconButton
                  color="secondary"
                  onClick={() => BookmarkHandle(job.id)}
                >
                  {job.bookmarked ? (
                    <Bookmark style={{ fontSize: 25 }} />
                  ) : (
                    <BookmarkBorder style={{ fontSize: 25 }} />
                  )}
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <div className={classes.summery}>
            <p
              className={classes.para}
              dangerouslySetInnerHTML={{ __html: linkify(job.content) }}
            />
          </div>
          <Divider />
          <DialogAlert alert={alert} setAlert={setAlert} />
          <Notification notify={notify} setNotify={setNotify} />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  job: state.job.job,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default withRouter(
  connect(mapStateToProps, {
    load_job,
    bookmark_job,
  })(JobPage)
);
