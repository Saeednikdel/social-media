import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login, resetState } from "../../actions/auth";
import {
  TextField,
  Button,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import translate from "../../translate";
const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: theme.palette.secondary.light,
    margin: 5,
  },
}));
const Login = ({
  login,
  isAuthenticated,
  requestFail,
  resetState,
  login_error,
}) => {
  const classes = useStyles();
  const [requestSent, setRequestSent] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (isAuthenticated) {
      resetState();
    }
  }, [requestFail, isAuthenticated]);
  const { email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to="/" />;
  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Typography variant="h5">{translate("log in")}</Typography>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            autoComplete="off"
            type="email"
            label={translate("email")}
            name="email"
            value={email}
            error={login_error && login_error.detail && true}
            helperText={
              login_error &&
              login_error.detail &&
              translate("password or email doesn't match")
            }
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            autoComplete="off"
            type="password"
            label={translate("password")}
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="4"
            required
          />
        </div>
        <Button
          type="submit"
          style={{ margin: 20 }}
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
          {translate("log in")}
        </Button>
      </form>
      <Typography variant="body1">
        {translate("haven't sign up yet?")}{" "}
        <Link className={classes.navLink} to="/signup">
          {translate("sign up")}
        </Link>
      </Typography>
      <Typography variant="body1">
        {translate("forgot your password?")}{" "}
        <Link className={classes.navLink} to="/reset_password">
          {translate("reset")}
        </Link>
      </Typography>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  login_error: state.auth.login_error,
});

export default connect(mapStateToProps, { login, resetState })(Login);
