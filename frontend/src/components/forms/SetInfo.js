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

const useStyles = makeStyles((theme) => ({
  textField: { marginTop: 5, minWidth: 240 },
  button: { marginTop: 20, marginBottom: 20 },
}));
const SetInfo = ({
  _id,
  _address,
  _militry_service,
  setOpenPopup,
  requestSuccess,
  requestFail,
}) => {
  const [requestSent, setRequestSent] = useState(false);
  const classes = useStyles();
  const [formData, setFormData] = useState({
    id: _id,
    address: _address,
    militry_service: _militry_service,
  });
  const { id, address, militry_service } = formData;
  const [openLevel, setOpenLevel] = useState(false);
  const serviceList = [
    { title: "مشمول", value: "N" },
    { title: "پایان خدمت", value: "C" },
    { title: "در حال انجام", value: "D" },
    { title: "معاف", value: "E" },
  ];
  useEffect(() => {
    if (requestFail) {
      setRequestSent(false);
    }
    if (requestSuccess) {
      setOpenPopup(false);
    }
  }, [requestFail, requestSuccess]);
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setRequestSent(true);
    console.log(formData);
  };
  return (
    <div style={{ textAlign: "center" }}>
      <form autoComplete="off" onSubmit={(e) => onSubmit(e)}>
        <div>
          <TextField
            className={classes.textField}
            autoComplete="off"
            type="text"
            label="محل سکونت"
            name="address"
            value={address}
            onChange={(e) => onChange(e)}
            required
          />
        </div>
        <div>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>وضعیت نظام وظیفه</InputLabel>
            <Select
              open={openLevel}
              onClose={() => setOpenLevel(false)}
              onOpen={() => setOpenLevel(true)}
              value={militry_service}
              name="militry_service"
              onChange={(e) => onChange(e)}
            >
              <MenuItem value="">هیچ کدام</MenuItem>
              {serviceList.map((l) => (
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
  requestSuccess: state.auth.requestSuccess,
  requestFail: state.auth.requestFail,
});
export default connect(mapStateToProps, {})(SetInfo);
