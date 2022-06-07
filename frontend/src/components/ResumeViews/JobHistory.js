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

export const JobHistory = ({ job_history }) => {
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <div style={{ minHeight: 200, marginTop: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography color="secondary">سابقه کاری</Typography>
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
                  <Typography>{row.title + " در " + row.company}</Typography>
                  <Typography>
                    {"از " +
                      jMoment(row.start_date, "YYYY/M/D").format(
                        "jYYYY/jM/jD"
                      ) +
                      " تا " +
                      jMoment(row.end_date, "YYYY/M/D").format("jYYYY/jM/jD")}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <IconButton>
                    <DeleteOutline color="error" />
                  </IconButton>
                </div>
              </Card>
            </Grid>
          ))}
      </Grid>

      <Popup
        title={"افزودن سابقه کار"}
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

export default connect(mapStateToProps)(JobHistory);
