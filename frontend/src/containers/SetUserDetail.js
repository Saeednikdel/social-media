import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import jMoment from "moment-jalaali";
import JalaliUtils from "@date-io/jalaali";
import { set_user_detail, resetState } from "../actions/auth";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetUserDetail = ({
  propsid,
  propsname,
  propsbio,
  propsphone_no,
  propsbirth_date,
  setOpenPopup,
  set_user_detail,
  resetState,
  requestSuccess,
  requestFail,
}) => {
  const [formData, setFormData] = useState({
    id: propsid,
    name: propsname,
    bio: propsbio,
    phone_no: propsphone_no,
    birth_date: propsbirth_date,
  });
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();

  const { id, name, bio, phone_no, birth_date } = formData;
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
    set_user_detail(id, name, bio, phone_no, birth_date);
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
            label="نام و نام خانوادگی"
            name="name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label="بیو"
            name="bio"
            value={bio}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            autoComplete="off"
            className={classes.textField}
            type="number"
            label="تلفن"
            name="phone_no"
            value={phone_no}
            onChange={(e) => onChange(e)}
            required
          />
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
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
});
export default connect(mapStateToProps, { set_user_detail, resetState })(
  SetUserDetail
);
