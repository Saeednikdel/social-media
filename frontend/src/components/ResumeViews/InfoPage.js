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
              ویرایش
            </Button>
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
                  نمایش رزومه : {resume.show_resume ? "برای همه" : "فقط خودم"}
                </Typography>
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
          <Popup
            title={"ویرایش مشخصات"}
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
