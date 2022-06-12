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
import { add_skill } from "../../actions/resume";

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetSkill = ({ setOpenPopup, add_skill, new_skill }) => {
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    title: null,
    level: null,
  });
  const { title, level } = formData;
  const [openLevel, setOpenLevel] = useState(false);
  const levelList = [
    { title: "مبتدی", value: "J" },
    { title: "متوسط", value: "M" },
    { title: "پیشرفته", value: "S" },
  ];
  useEffect(() => {
    if (new_skill && new_skill.id) {
      setOpenPopup(false);
    } else if (new_skill && new_skill === "error") {
      setRequestSent(false);
    }
  }, [new_skill]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    add_skill(false, title, level);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label="عنوان"
            name="title"
            value={title}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>سطح</InputLabel>
            <Select
              open={openLevel}
              onClose={() => setOpenLevel(false)}
              onOpen={() => setOpenLevel(true)}
              value={level}
              name="level"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value="">هیچ کدام</MenuItem>
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
          تایید
        </Button>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  new_skill: state.resume.new_skill,
});
export default connect(mapStateToProps, { add_skill })(SetSkill);
