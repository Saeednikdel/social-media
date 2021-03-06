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
import SetJobHistory from "../forms/SetJobHistory";
import Popup from "../Popup";
import jMoment from "moment-jalaali";
import { add_job } from "../../actions/resume";
import translate from "../../translate";
export const JobHistory = ({ job_history, add_job }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div style={{ minHeight: 200, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="secondary">{translate("job history")}</Typography>
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
        {job_history &&
          job_history.map((row) => (
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
                    {row.title + " " + translate("in") + " " + row.company}
                  </Typography>
                  <Typography>
                    {translate("from") +
                      " " +
                      jMoment(row.start_date, "YYYY/M/D").format(
                        "jYYYY/jM/jD"
                      ) +
                      " " +
                      translate("to") +
                      " " +
                      jMoment(row.end_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <IconButton onClick={() => add_job(row.id)}>
                    <DeleteOutline color="error" />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Popup
        title={translate("add job history")}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <SetJobHistory setOpenPopup={setOpenPopup} />
      </Popup>
    </div>
  );
};

const mapStateToProps = (state) => ({
  job_history: state.resume.resume.job_history,
});

export default connect(mapStateToProps, { add_job })(JobHistory);
