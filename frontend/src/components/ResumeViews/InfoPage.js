import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  makeStyles,
  Button,
  Card,
  Avatar,
} from "@material-ui/core";
import Popup from "../Popup";
import SetInfo from "../forms/SetInfo";
import jMoment from "moment-jalaali";
import translate from "../../translate";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 20,
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
}));

export const InfoPage = ({ resume }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
      {resume && (
        <>
          <div className={classes.container}>
            <Typography color="secondary">مشخصات</Typography>
            <Button
              color="secondary"
              variant="outlined"
              size="small"
              onClick={() => setOpenPopup(true)}
            >
              {translate("edit")}
            </Button>
          </div>
          <Card variant="outlined">
            <Avatar className={classes.avatar} src={resume.image} />
            <div className={classes.paneContauner}>
              <div className={classes.pane}>
                <Typography>
                  {translate("name")} : {resume.profile_name}
                </Typography>
                <Typography>
                  {translate("email")}: {resume.email}
                </Typography>
                <Typography>
                  {translate("phone number")} : {resume.phone_no}
                </Typography>
                <Typography>
                  {translate("biography")}: {resume.bio}
                </Typography>
              </div>
              <div className={classes.pane}>
                <Typography>
                  {translate("show resume")} :
                  {resume.show_resume
                    ? translate("every one")
                    : translate("only me")}
                </Typography>
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
                  {translate("address")} :
                  {resume.address ? resume.address : "--"}
                </Typography>
              </div>
            </div>
          </Card>
          <Popup
            title={translate("edit info")}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <SetInfo setOpenPopup={setOpenPopup} />
          </Popup>
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  resume: state.resume.resume,
});

export default connect(mapStateToProps)(InfoPage);
