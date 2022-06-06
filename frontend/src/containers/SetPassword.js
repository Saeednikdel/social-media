import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { set_password, resetState } from "../actions/auth";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetPassword = ({
  set_password,
  setOpenPopup,
  requestSuccess,
  resetState,
  requestFail,
  set_pass_error,
}) => {
  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
    current_password: "",
  });
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();

  const { new_password, re_new_password, current_password } = formData;
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
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    set_password(new_password, re_new_password, current_password);
    setRequestSent(true);
  };
  const passHelper = (text) => {
    switch (text) {
      case "This password is too short. It must contain at least 8 characters.":
        return "حداقل ۸ کاراکتر شامل حروف و اعداد";
      case "This password is too common.":
        return "یک رمزعبور بهتر انتخاب کنید";
      case "This password is entirely numeric.":
        return "رمزعبور کاملا عددی مجاز نیست";
      case "The password is too similar to the email.":
        return "رمزعبور مشابه ایمیل مجاز نیست";
      default:
        return "";
    }
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="password"
            label="رمز عبور جدید"
            name="new_password"
            value={new_password}
            error={set_pass_error && set_pass_error.new_password && true}
            helperText={
              set_pass_error &&
              set_pass_error.new_password &&
              passHelper(set_pass_error.new_password[0])
            }
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="password"
            label="تکرار رمز جدید"
            name="re_new_password"
            value={re_new_password}
            error={set_pass_error && set_pass_error.non_field_errors && true}
            helperText={
              set_pass_error &&
              set_pass_error.non_field_errors &&
              "تکرار رمز اشتباه است"
            }
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="password"
            label="رمز عبور فعلی"
            name="current_password"
            value={current_password}
            error={set_pass_error && set_pass_error.current_password && true}
            helperText={
              set_pass_error &&
              set_pass_error.current_password &&
              "رمزعبور اشتباه است"
            }
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <Button
          className={classes.button}
          variant="contained"
          color="secondary"
          type="submit"
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
  set_pass_error: state.auth.set_pass_error,
});
export default connect(mapStateToProps, { set_password, resetState })(
  SetPassword
);
