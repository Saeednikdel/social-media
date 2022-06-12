import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Chip, Button, makeStyles } from "@material-ui/core";
import { add_skill } from "../../actions/resume";
import translate from "../../translate";
import SetSkill from "../forms/SetSkill";
import Popup from "../Popup";
const useStyles = makeStyles((theme) => ({
  chip: {
    margin: 10,
  },
  chipContainer: {
    whiteSpace: "wrap",
  },
}));
export const Skills = ({ skill, add_skill }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles();
  return (
    <div style={{ minHeight: 200, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="secondary">{translate("skills")}</Typography>
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
        {skill &&
          skill.map((l) => (
            <Chip
              className={classes.chip}
              label={l.title + " | " + translate(l.level)}
              onDelete={() => add_skill(l.id)}
              color="secondary"
            />
          ))}
      </div>
      <Popup
        title={translate("add skill")}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SetSkill setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => ({ skill: state.resume.resume.skill });

export default connect(mapStateToProps, { add_skill })(Skills);
