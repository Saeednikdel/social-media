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
import { set_resume_detail } from "../../actions/auth";
import { resetState } from "../../actions/auth";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import translate from "../../translate";
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetInfo = ({
  setOpenPopup,
  resume,
  set_resume_detail,
  resetState,
  requestSuccess,
  requestFail,
}) => {
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    id: resume.user,
    profile_name: resume.profile_name,
    name: resume.name,
    phone_no: resume.phone_no,
    bio: resume.bio,
    birth_date: resume.birth_date,
    show_resume: resume.show_resume,
    address: resume.address,
    military_service: resume.military_service,
  });
  const {
    id,
    profile_name,
    phone_no,
    name,
    birth_date,
    show_resume,
    military_service,
    address,
    bio,
  } = formData;
  const [openMilitaryService, setOpenMilitaryService] = useState(false);
  const [openShowResume, setOpenShowResume] = useState(false);
  const serviceList = [
    { title: translate("conscript"), value: "conscript" },
    { title: translate("completed"), value: "completed" },
    { title: translate("serving"), value: "serving" },
    { title: translate("exempt"), value: "exempt" },
  ];
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (requestSuccess) {
      setOpenPopup(false);
      resetState();
    }
  }, [requestFail, requestSuccess]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    set_resume_detail(
      id,
      profile_name,
      name,
      phone_no,
      birth_date,
      show_resume,
      military_service,
      address,
      bio
    );
    setRequestSent(true);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label={translate("name")}
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
            label={translate("phone number")}
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
            label={translate("biography")}
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
            label={translate("address")}
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>{translate("show resume")}</InputLabel>
            <Select
              open={openShowResume}
              onClose={() => setOpenShowResume(false)}
              onOpen={() => setOpenShowResume(true)}
              value={show_resume}
              name="show_resume"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value={false}>{translate("only me")}</MenuItem>
              <MenuItem value={true}>{translate("every one")}</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <DatePicker
              className={classes.textField}
              name="birth_date"
              okLabel={translate("ok")}
              label={translate("birth date")}
              cancelLabel={translate("cancel")}
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
            <InputLabel>{translate("military service status")}</InputLabel>
            <Select
              open={openMilitaryService}
              onClose={() => setOpenMilitaryService(false)}
              onOpen={() => setOpenMilitaryService(true)}
              value={military_service}
              name="military_service"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value="">{translate("none")}</MenuItem>
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
          {translate("ok")}
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  resume: state.resume.resume,
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
});
export default connect(mapStateToProps, { set_resume_detail, resetState })(
  SetInfo
);
