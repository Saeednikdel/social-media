import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Chip, Button, makeStyles } from "@material-ui/core";
import SetLanguage from "../forms/SetLanguage";
import Popup from "../Popup";
import { add_language } from "../../actions/resume";

const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 10,
  },
  chipContainer: {
    whiteSpace: "wrap",
  },
}));
export const Language = ({ language, add_language }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles();
  const convert = (string) => {
    switch (string) {
      case "R":
        return "خواندن و نوشتن";
      case "C":
        return "درک مطلب";
      case "S":
        return "مکالمه";
      default:
        return "";
    }
  };
  return (
    <div style={{ minHeight: 200, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="secondary">زبان های خارجی</Typography>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => setOpenPopup(true)}
        >
          +
        </Button>
      </div>

      <div className={classes.chipContainer}>
        {language &&
          language.map((l) => (
            <Chip
              className={classes.chip}
              label={l.title + " | " + convert(l.level)}
              onDelete={() => add_language(l.id)}
              color="secondary"
            />
          ))}
      </div>
      <Popup
        title={"افزودن زبان"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SetLanguage setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => ({ language: state.resume.resume.language });

export default connect(mapStateToProps, { add_language })(Language);
