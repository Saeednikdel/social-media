import React, { useState } from "react";
import { connect } from "react-redux";
import { Typography, Chip, Button, makeStyles } from "@material-ui/core";

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
export const Skills = ({ skill }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const classes = useStyles();
  const handleDelete = (id) => {};
  const convert = (string) => {
    switch (string) {
      case "J":
        return "مبتدی";
      case "M":
        return "متوسط";
      case "S":
        return "پیشرفته";
      default:
        return "";
    }
  };
  return (
    <div style={{ minHeight: 200, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="secondary">مهارت ها</Typography>
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
              label={l.title + " | " + convert(l.level)}
              onDelete={() => handleDelete(l.id)}
              color="secondary"
            />
          ))}
      </div>
      <Popup
        title={"افزودن مهارت"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SetSkill setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => ({ skill: state.resume.resume.skill });

export default connect(mapStateToProps)(Skills);
