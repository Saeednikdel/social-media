import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { signup, resetState } from "../../actions/auth";
import {
  TextField,
  Button,
  makeStyles,
  Typography,
  CircularProgress,
} from "@material-ui/core";
import DialogAlert from "../DialogAlert";
import { Done } from "@material-ui/icons";
import translate from "../../translate";
const useStyles = makeStyles((theme) => ({
  navLink: {
    textDecoration: "none",
    color: theme.palette.secondary.light,
    margin: 5,
  },
  textfield: {
    marginTop: 10,
    minWidth: 250,
  },
}));
const Signup = ({
  signup,
  isAuthenticated,
  requestSuccess,
  requestFail,
  resetState,
  signup_error,
}) => {
  const classes = useStyles();
  const [requestSent, setRequestSent] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    title: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    re_password: "",
  });
  const { name, email, password, re_password } = formData;
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (requestSuccess) {
      resetState();
      setRequestSent(false);
      setAlert({
        isOpen: true,
        title: translate("sign up seccessfull"),
        message: translate("open the link sent to you by email"),
      });
    }
  }, [requestFail, requestSuccess]);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    signup({ name, email, password, re_password });
    setRequestSent(true);
    // if (password === re_password) {
    //   signup({ name, email, password, re_password });
    //   setRequestSent(true);
    // }
  };
  if (isAuthenticated) return <Redirect to="/" />;

  return (
    <div style={{ textAlign: "center", marginTop: 20 }}>
      <Typography variant="h5">{translate("sign up")}</Typography>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textfield}
            autoComplete="off"
            type="text"
            label={translate("user name")}
            name="name"
            value={name}
            error={signup_error && signup_error.name && true}
            helperText={
              signup_error &&
              signup_error.name &&
              translate(signup_error.name[0])
            }
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textfield}
            autoComplete="off"
            type="email"
            label={translate("email")}
            name="email"
            value={email}
            error={signup_error && signup_error.email && true}
            helperText={signup_error && translate(signup_error.email)}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textfield}
            autoComplete="off"
            type="password"
            label={translate("password")}
            name="password"
            value={password}
            error={signup_error && signup_error.password && true}
            helperText={
              signup_error &&
              signup_error.password &&
              translate(signup_error.password[0])
            }
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <div>
          <TextField
            className={classes.textfield}
            autoComplete="off"
            type="password"
            label={translate("retype password")}
            name="re_password"
            value={re_password}
            error={signup_error && signup_error.non_field_errors && true}
            helperText={
              signup_error && translate(signup_error.non_field_errors)
            }
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
        </div>
        <Button
          style={{ margin: 20 }}
          type="submit"
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
          {translate("sign up")}
        </Button>
      </form>
      <Typography variant="body1">
        {translate("you have signed up before?")}{" "}
        <Link className={classes.navLink} to="/login">
          {translate("log in")}{" "}
        </Link>
      </Typography>
      <DialogAlert alert={alert} setAlert={setAlert} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  signup_error: state.auth.signup_error,
});

export default connect(mapStateToProps, { signup, resetState })(Signup);
