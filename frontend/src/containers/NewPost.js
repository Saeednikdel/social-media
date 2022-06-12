import React, { useState } from "react";
import { connect } from "react-redux";
import {
  TextField,
  Button,
  makeStyles,
  CircularProgress,
  Checkbox,
  FormControlLabel,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import Redirect from "react-router-dom/es/Redirect";
import { useHistory } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  textField: { minWidth: 240, width: "80%" },
  top: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
  },
  containter: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "stretch",
  },
}));
const NewPost = ({ isAuthenticated, user }) => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const classes = useStyles();
  const history = useHistory();
  const { content } = formData;
  const [requestSent, setRequestSent] = useState(false);
  const [checkJob, setCheckJob] = useState(false);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    checkJob ? new_job() : new_post();
    setRequestSent(true);
  };
  if (isAuthenticated === false) return <Redirect to="/login" />;

  return (
    <form
      autoComplete="off"
      onSubmit={(e) => onSubmit(e)}
      style={{ textAlign: "center" }}
    >
      <div className={classes.containter}>
        <div className={classes.top}>
          <div>
            {user && user.is_entity && (
              <FormControlLabel
                label="آگهی شغل"
                control={
                  <Checkbox
                    checked={checkJob}
                    onChange={() => setCheckJob(!checkJob)}
                  />
                }
              />
            )}
          </div>
          <Button
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
      </div>
      <div>
        <TextField
          variant="outlined"
          autoComplete="off"
          className={classes.textField}
          type="text"
          label={checkJob ? "متن آگهی" : "متن پست"}
          name="content"
          value={content}
          multiline
          rows={10}
          onChange={(e) => onChange(e)}
          required
        />
      </div>
    </form>
  );
  async function new_job() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const user = localStorage.getItem("id");
      const body = JSON.stringify({ user, content });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/jobs/job-create/`,
          body,
          config
        );
        setRequestSent(false);
        history.push("/jobs");
      } catch (err) {
        setRequestSent(false);
      }
    }
  }
  async function new_post() {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const user = localStorage.getItem("id");
      const body = JSON.stringify({ user, content });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/blog/post-create/`,
          body,
          config
        );
        setRequestSent(false);
        history.push("/");
      } catch (err) {
        setRequestSent(false);
      }
    }
  }
};
const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});
export default connect(mapStateToProps, {})(NewPost);
