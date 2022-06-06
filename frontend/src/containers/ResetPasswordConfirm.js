import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { reset_password_confirm, resetState } from "../actions/auth";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { Done } from "@material-ui/icons";

const ResetPasswordConfirm = ({
  requestSuccess,
  reset_password_confirm,
  match,
  resetState,
  requestFail,
  reset_pass_error,
}) => {
  const [requestSent, setRequestSent] = useState(false);
  const [rePassHelper, setRePassHelper] = useState(false);

  const [formData, setFormData] = useState({
    new_password: "",
    re_new_password: "",
  });

  const { new_password, re_new_password } = formData;
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (requestSuccess) {
      resetState();
    }
  }, [requestFail, requestSuccess]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (re_new_password === new_password) {
      const uid = match.params.uid;
      const token = match.params.token;
      setRePassHelper(false);
      reset_password_confirm(uid, token, new_password, re_new_password);
      setRequestSent(true);
    } else {
      setRePassHelper(true);
    }
  };
  if (requestSent === requestSuccess) return <Redirect to="/" />;
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
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            autoComplete="off"
            type="password"
            label="رمز عبور جدید"
            name="new_password"
            value={new_password}
            onChange={(e) => onChange(e)}
            error={reset_pass_error && reset_pass_error.new_password && true}
            helperText={
              reset_pass_error &&
              reset_pass_error.new_password &&
              passHelper(reset_pass_error.new_password[0])
            }
            minLength="6"
            required
          />
        </div>
        <div>
          <TextField
            autoComplete="off"
            type="password"
            label="تکرار رمز عبور"
            name="re_new_password"
            value={re_new_password}
            error={rePassHelper}
            helperText={rePassHelper && "تکرار رمز اشتباه است"}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <Button
          style={{ margin: 20 }}
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
  reset_pass_error: state.auth.reset_pass_error,
});
export default connect(mapStateToProps, { reset_password_confirm, resetState })(
  ResetPasswordConfirm
);
