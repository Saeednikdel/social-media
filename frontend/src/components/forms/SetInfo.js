import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  makeStyles,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetInfo = ({ setOpenPopup, resume }) => {
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    id: resume.id,
    profile_name: resume.profile_name,
    phone_no: resume.phone_no,
    bio: resume.bio,
    birth_date: resume.birth_date,
    show_resume: resume.show_resume,
    address: resume.address,
    militry_service: resume.militry_service,
  });
  const {
    id,
    profile_name,
    phone_no,
    birth_date,
    show_resume,
    militry_service,
    address,
    bio,
  } = formData;
  const [openMilitaryService, setOpenMilitaryService] = useState(false);
  const [openShowResume, setOpenShowResume] = useState(false);
  const serviceList = [
    { title: "مشمول", value: "N" },
    { title: "پایان خدمت", value: "C" },
    { title: "در حال انجام", value: "D" },
    { title: "معاف", value: "E" },
  ];
  useEffect(() => {}, []);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    console.log(formData);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label="نام"
            name="profile_name"
            value={profile_name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="number"
            label="تلفن"
            name="phone_no"
            value={phone_no}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label="متن معرفی"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label="محل سکونت"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>نمایش رزومه</InputLabel>
            <Select
              open={openShowResume}
              onClose={() => setOpenShowResume(false)}
              onOpen={() => setOpenShowResume(true)}
              value={show_resume}
              name="show_resume"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value={false}>فقط خودم</MenuItem>
              <MenuItem value={true}>برای همه</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <DatePicker
              className={classes.textField}
              name="birth_date"
              okLabel="تأیید"
              label="تاریخ تولد"
              cancelLabel="لغو"
              labelFunc={(date) => (date ? date.format("jYYYY/jMM/jDD") : "")}
              value={birth_date}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  birth_date: date.toISOString().split("T")[0],
                })
              }
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>وضعیت نظام وظیفه</InputLabel>
            <Select
              open={openMilitaryService}
              onClose={() => setOpenMilitaryService(false)}
              onOpen={() => setOpenMilitaryService(true)}
              value={militry_service}
              name="militry_service"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value="">هیچ کدام</MenuItem>
              {serviceList.map((l) => (
                <MenuItem value={l.value}>{l.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <Button
          type="submit"
          className={classes.button}
          variant="contained"
          color="secondary"
          startIcon={
            requestSent ? (
              <CircularProgress
                size={20}
                style={{ marginLeft: "10px" }}
                color="inherit"
              />
            ) : (
              <Done style={{ marginLeft: "10px" }} />
            )
          }
        >
          تایید
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  resume: state.resume.resume,
});
export default connect(mapStateToProps, {})(SetInfo);
