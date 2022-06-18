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
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { add_education } from "../../actions/resume";
import translate from "../../translate";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetEducation = ({ setOpenPopup, add_education, new_edu }) => {
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: null,
    end_date: null,
    campus: null,
    score: null,
  });
  const { title, end_date, campus, score } = formData;
  useEffect(() => {
     if (new_edu && new_edu === "error") {
      setRequestSent(false);
    } else if (new_edu && requestSent) {
      setOpenPopup(false);
    }
  }, [new_edu]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    add_education(false, title, campus, end_date, score);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label={translate("grade")}
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <DatePicker
              required
              className={classes.textField}
              name="end_date"
              okLabel={translate("ok")}
              label={translate("graduation date")}
              cancelLabel={translate("cancel")}
              labelFunc={(date) => (date ? date.format("jYYYY/jMM/jDD") : "")}
              value={end_date}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  end_date: date.toISOString().split("T")[0],
                })
              }
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label={translate("university")}
            name="campus"
            value={campus}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <TextField
            autoComplete="off"
            className={classes.textField}
            type="number"
            label={translate("grade point average")}
            name="score"
            value={score}
            onChange={(e) => onChange(e)}
            required
          />
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
  new_edu: state.resume.new_edu,
});
export default connect(mapStateToProps, { add_education })(SetEducation);
