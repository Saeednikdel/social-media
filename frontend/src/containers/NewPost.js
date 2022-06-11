import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { resetState, new_post } from "../actions/auth";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import Redirect from "react-router-dom/es/Redirect";

const useStyles = makeStyles((theme) => ({
  textField: { minWidth: 240, width: "80%" },
  button: { marginTop: 20, marginBottom: 20 },
  left: {
    display: "flex",
    justifyContent: "flex-end",
    width: "90%",
  },
}));
const NewPost = ({
  requestSuccess,
  requestFail,
  new_post,
  isAuthenticated,
  resetState,
}) => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const classes = useStyles();

  const { content } = formData;
  const [requestSent, setRequestSent] = useState(false);
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
      resetState();
    }
    if (requestSuccess) {
      setRequestSent(false);
      resetState();
    }
  }, [requestFail, requestSuccess]);
  if (isAuthenticated === false) return <Redirect to="/login" />;
  if (requestSuccess === true) return <Redirect to="/" />;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    new_post(content);
    setRequestSent(true);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div className={classes.left}>
          <Button
            className={classes.button}
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
            ارسال
          </Button>
        </div>
        <div>
          <TextField
            variant="outlined"
            autoComplete="off"
            className={classes.textField}
            type="text"
            label="متن پست"
            name="content"
            value={content}
            multiline
            rows={10}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
  isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, { resetState, new_post })(NewPost);
