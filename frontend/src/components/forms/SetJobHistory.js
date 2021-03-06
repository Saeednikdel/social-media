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
import { add_job } from "../../actions/resume";
import translate from "../../translate";

jMoment.loadPersian({ dialect: "persian-modern", usePersianDigits: true });

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetJobHistory = ({ setOpenPopup, add_job, new_job }) => {
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: null,
    end_date: null,
    start_date: null,
    company: null,
  });
  const { title, end_date, start_date, company } = formData;
  useEffect(() => {
     if (new_job && new_job === "error") {
      setRequestSent(false);
    } else if (new_job && requestSent) {
      setOpenPopup(false);
    }
  }, [new_job]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    add_job(false, title, start_date, end_date, company);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label={translate("title")}
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
              name="start_date"
              okLabel={translate("ok")}
              label={translate("start date")}
              cancelLabel={translate("cancel")}
              labelFunc={(date) => (date ? date.format("jYYYY/jMM/jDD") : "")}
              value={start_date}
              onChange={(date) =>
                setFormData({
                  ...formData,
                  start_date: date.toISOString().split("T")[0],
                })
              }
            />
          </MuiPickersUtilsProvider>
        </div>
        <div>
          <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
            <DatePicker
              required
              className={classes.textField}
              name="end_date"
              okLabel={translate("ok")}
              label={translate("end date")}
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
            label={translate("company")}
            name="company"
            value={company}
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
  new_job: state.resume.new_job,
});
export default connect(mapStateToProps, { add_job })(SetJobHistory);
