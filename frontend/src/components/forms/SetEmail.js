import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { set_email, resetState } from "../../actions/auth";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import translate from "../../translate";

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetEmail = ({
  set_email,
  setOpenPopup,
  requestSuccess,
  requestFail,
  resetState,
  set_email_error,
}) => {
  const [formData, setFormData] = useState({
    new_email: "",
    re_new_email: "",
    current_password: "",
  });

  const { new_email, re_new_email, current_password } = formData;
  const classes = useStyles();

  const [requestSent, setRequestSent] = useState(false);
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
    set_email(
      new_email.toLowerCase(),
      re_new_email.toLowerCase(),
      current_password
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
            type="email"
            label={translate("new email")}
            name="new_email"
            value={new_email}
            error={set_email_error && set_email_error.new_email && true}
            helperText={set_email_error && translate(set_email_error.new_email)}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="email"
            label={translate("retype email")}
            name="re_new_email"
            value={re_new_email}
            error={set_email_error && set_email_error.non_field_errors && true}
            helperText={
              set_email_error && translate(set_email_error.non_field_errors)
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
            label={translate("password")}
            name="current_password"
            value={current_password}
            onChange={(e) => onChange(e)}
            error={set_email_error && set_email_error.current_password && true}
            helperText={
              set_email_error && translate(set_email_error.current_password[0])
            }
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
          {translate("ok")}
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  set_email_error: state.auth.set_email_error,
});
export default connect(mapStateToProps, { set_email, resetState })(SetEmail);
