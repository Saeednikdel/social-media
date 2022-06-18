import React, { useEffect } from "react";
import { connect } from "react-redux";
import { load_requested_resume } from "../actions/job";
import jMoment from "moment-jalaali";
import translate from "../translate";

import {
  Typography,
  makeStyles,
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
  return (
    <div style={{ minHeight: 400, margin: 10 }}>
      {resume && userId == resume.user && (
        <>
          <div className={classes.container}>
            <Typography color="secondary">{translate("info")}</Typography>
          </div>
          <Card variant="outlined">
            <Avatar className={classes.avatar} src={resume.image} />
            <div className={classes.paneContauner}>
              <div className={classes.pane}>
                <Typography>
                  {translate("name")} : {resume.profile_name}
                </Typography>
                <Typography>
                  {translate("email")} : {resume.email}
                </Typography>
                <Typography>
                  {translate("phone number")} : {resume.phone_no}
                </Typography>
                <Typography>
                  {translate("biography")} : {resume.bio}
                </Typography>
              </div>
              <div className={classes.pane}>
                <Typography>
                  {translate("birth date")} :
                  {jMoment(resume.birth_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                </Typography>
                <Typography>
                  {translate("military service status")} :
                  {resume.military_service
                    ? translate(resume.military_service)
                    : "--"}
                </Typography>

                <Typography>
                  {translate("address")} :{" "}
                  {resume.address ? resume.address : "--"}
                </Typography>
              </div>
            </div>
          </Card>
          <div className={classes.container}>
            <Typography color="secondary">{translate("education")}</Typography>
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
                    <Typography>
                      {row.title + " " + translate("from") + " " + row.campus}
                    </Typography>
                    <Typography>
                      {translate("graduation date") +
                        ":" +
                        jMoment(row.end_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                    </Typography>
                    <Typography>
                      {translate("grade point average") + ":" + row.score}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.container}>
            <Typography color="secondary">
              {translate("job history")}
            </Typography>
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
                    <Typography>
                      {row.title + " " + translate("in") + " " + row.company}
                    </Typography>
                    <Typography>
                      {translate("from") +
                        " " +
                        jMoment(row.start_date, "YYYY/M/D").format(
                          "jYYYY/jM/jD"
                        ) +
                        " " +
                        translate("to") +
                        " " +
                        jMoment(row.end_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className={classes.container}>
            <Typography color="secondary">{translate("languages")}</Typography>
          </div>

          <div className={classes.chipContainer}>
            {resume.language.map((l) => (
              <Chip
                className={classes.chip}
                label={l.title + " | " + translate(l.level)}
                color="secondary"
              />
            ))}
          </div>
          <div className={classes.container}>
            <Typography color="secondary">{translate("skills")}</Typography>
          </div>

          <div className={classes.chipContainer}>
            {resume.skill.map((l) => (
              <Chip
                className={classes.chip}
                label={l.title + " | " + translate(l.level)}
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
