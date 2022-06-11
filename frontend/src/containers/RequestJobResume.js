import React, { useEffect } from "react";
import { connect } from "react-redux";
import { load_requested_resume } from "../actions/job";
import jMoment from "moment-jalaali";

import {
  Typography,
  makeStyles,
  Button,
  Card,
  Avatar,
  Chip,
  CardContent,
  Grid,
} from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  container: {
    margin: 20,
  },
  pane: {
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
  paneContauner: {
    display: "flex",
    flexWrap: "wrap",
    margin: 20,
    minHeight: 200,
  },
  avatar: {
    margin: 20,
    height: 60,
    width: 60,
  },
  chip: {
    margin: 10,
  },
  chipContainer: {
    whiteSpace: "wrap",
  },
}));
const RequestJobResume = ({ load_requested_resume, resume, match }) => {
  const classes = useStyles();
  const jobId = match.params.jobId;
  const userId = match.params.userId;

  useEffect(() => {
    load_requested_resume(jobId, userId);
  }, []);
  const convert = (string) => {
    switch (string) {
      case "N":
        return "مشمول";
      case "C":
        return "پایان خدمت";
      case "D":
        return "در حال خدمت";
      case "E":
        return "معاف";
      default:
        return "";
    }
  };
  const convert_s = (string) => {
    switch (string) {
      case "J":
        return "مبتدی";
      case "M":
        return "متوسط";
      case "S":
        return "پیشرفته";
      default:
        return "";
    }
  };
  const convert_l = (string) => {
    switch (string) {
      case "R":
        return "خواندن و نوشتن";
      case "C":
        return "درک مطلب";
      case "S":
        return "مکالمه";
      default:
        return "";
    }
  };
  return (
    <div style={{ minHeight: 400, margin: 10 }}>
      {resume && userId == resume.user && (
        <>
          <div className={classes.container}>
            <Typography color="secondary">مشخصات</Typography>
          </div>
          <Card variant="outlined">
            <Avatar className={classes.avatar} src={resume.image} />
            <div className={classes.paneContauner}>
              <div className={classes.pane}>
                <Typography>نام : {resume.profile_name}</Typography>
                <Typography>ایمیل : {resume.email}</Typography>
                <Typography>تلفن : {resume.phone_no}</Typography>
                <Typography>متن معرفی : {resume.bio}</Typography>
              </div>
              <div className={classes.pane}>
                <Typography>
                  تاریخ تولد :
                  {jMoment(resume.birth_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                </Typography>
                <Typography>
                  وضعیت نظام وظیفه :
                  {resume.military_service
                    ? convert(resume.military_service)
                    : "--"}
                </Typography>

                <Typography>
                  محل سکونت : {resume.address ? resume.address : "--"}
                </Typography>
              </div>
            </div>
          </Card>
          <div className={classes.container}>
            <Typography color="secondary">تحصیلات</Typography>
          </div>
          <Grid container spacing={1} style={{ marginTop: 10 }}>
            {resume.education.map((row) => (
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent
                    style={{
                      height: 140,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>{row.title + " از " + row.campus}</Typography>
                    <Typography>
                      {"تاریخ اخذ مدرک : " +
                        jMoment(row.end_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                    </Typography>
                    <Typography>{"معدل : " + row.score}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.container}>
            <Typography color="secondary">سابقه کاری</Typography>
          </div>
          <Grid container spacing={1} style={{ marginTop: 10 }}>
            {resume.job_history.map((row) => (
              <Grid item xs={12} sm={6}>
                <Card variant="outlined">
                  <CardContent
                    style={{
                      height: 140,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                    }}
                  >
                    <Typography>{row.title + " در " + row.company}</Typography>
                    <Typography>
                      {"از " +
                        jMoment(row.start_date, "YYYY/M/D").format(
                          "jYYYY/jM/jD"
                        ) +
                        " تا " +
                        jMoment(row.end_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.container}>
            <Typography color="secondary">زبان های خارجی</Typography>
          </div>

          <div className={classes.chipContainer}>
            {resume.language.map((l) => (
              <Chip
                className={classes.chip}
                label={l.title + " | " + convert_l(l.level)}
                color="secondary"
              />
            ))}
          </div>
          <div className={classes.container}>
            <Typography color="secondary">مهارت ها</Typography>
          </div>

          <div className={classes.chipContainer}>
            {resume.skill.map((l) => (
              <Chip
                className={classes.chip}
                label={l.title + " | " + convert_s(l.level)}
                color="secondary"
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  resume: state.job.resume,
});
export default connect(mapStateToProps, { load_requested_resume })(
  RequestJobResume
);
