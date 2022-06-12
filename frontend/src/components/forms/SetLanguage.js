import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Button,
  TextField,
  makeStyles,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { add_language } from "../../actions/resume";
import translate from "../../translate";

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetLanguage = ({ setOpenPopup, add_language, new_lang }) => {
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: null,
    level: null,
  });
  const { title, level } = formData;
  const [openLevel, setOpenLevel] = useState(false);

  const levelList = [
    { title: translate("read and write"), value: "R" },
    { title: translate("comprehension"), value: "C" },
    { title: translate("speaking"), value: "S" },
  ];
  useEffect(() => {
    if (new_lang && new_lang.id) {
      setOpenPopup(false);
    } else if (new_lang && new_lang === "error") {
      setRequestSent(false);
    }
  }, [new_lang]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    add_language(false, title, level);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label={translate("language")}
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>{translate("level")}</InputLabel>
            <Select
              open={openLevel}
              onClose={() => setOpenLevel(false)}
              onOpen={() => setOpenLevel(true)}
              value={level}
              name="level"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value="">{translate("none")}</MenuItem>
              {levelList.map((l) => (
                <MenuItem value={l.value}>{l.title}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
  new_lang: state.resume.new_lang,
});
export default connect(mapStateToProps, { add_language })(SetLanguage);
