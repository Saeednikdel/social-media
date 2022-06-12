import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Chip, Button, makeStyles } from "@material-ui/core";
import SetLanguage from "../forms/SetLanguage";
import Popup from "../Popup";
import { add_language } from "../../actions/resume";
import translate from "../../translate";
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
  return (
    <div style={{ minHeight: 200, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="secondary">{translate("languages")}</Typography>
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
              label={l.title + " | " + translate(l.level)}
              onDelete={() => add_language(l.id)}
              color="secondary"
            />
          ))}
      </div>
      <Popup
        title={translate("add language")}
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
