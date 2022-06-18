import React, { useState } from "react";
import { connect } from "react-redux";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
} from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import SetEducation from "../forms/SetEducation";
import Popup from "../Popup";
import jMoment from "moment-jalaali";
import { add_education } from "../../actions/resume";
import translate from "../../translate";
export const Education = ({ education, add_education }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div style={{ minHeight: 200, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="secondary">{translate("education")}</Typography>
        <Button
          color="secondary"
          variant="outlined"
          size="small"
          onClick={() => setOpenPopup(true)}
        >
          +
        </Button>
      </div>
      <Grid container spacing={1} style={{ marginTop: 10 }}>
        {education &&
          education.map((row) => (
            <Grid item xs={12} sm={6}>
              <Card variant="outlined">
                <CardContent
                  style={{
                    height: 140,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                  }}
                >
                  <Typography>
                    {row.title + " " + translate("from") + " " + row.campus}
                  </Typography>
                  <Typography>
                    {translate("graduation date") +
                      " : " +
                      jMoment(row.end_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                  </Typography>
                  <Typography>
                    {translate("grade point average") + " : " + row.score}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <IconButton onClick={() => add_education(row.id)}>
                    <DeleteOutline color="error" />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Popup
        title={translate("add education")}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SetEducation setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  education: state.resume.resume.education,
});

export default connect(mapStateToProps, { add_education })(Education);
