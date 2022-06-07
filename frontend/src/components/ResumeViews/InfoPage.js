import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Divider, Button, Card, Avatar } from "@material-ui/core";
import Popup from "../Popup";
import SetInfo from "../forms/SetInfo";
import jMoment from "moment-jalaali";

export const InfoPage = ({ resume }) => {
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
    <div style={{ marginTop: 20 }}>
      {resume && (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
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
            <Avatar style={{ margin: 20 }} src={resume.image} />
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                margin: 20,
                minHeight: 200,
              }}
            >
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Typography>نام : {resume.profile_name}</Typography>
                <Typography>ایمیل : {resume.email}</Typography>
                <Typography>تلفن : {resume.phone_no}</Typography>
              </div>
              <div
                style={{
                  flexGrow: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <Typography>
                  تاریخ تولد :
                  {jMoment(resume.birth_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                </Typography>
                <Typography>
                  وضعیت نظام وظیفه :
                  {resume.militry_service
                    ? convert(resume.militry_service)
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
            <SetInfo
              _id={resume.id}
              _militry_service={resume && resume.militry_service}
              _address={resume.address}
              setOpenPopup={setOpenPopup}
            />
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
