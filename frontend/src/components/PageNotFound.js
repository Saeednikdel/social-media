import React from "react";
import { Typography } from "@material-ui/core";
import translate from "../translate";

function PageNotFound() {
  return (
    <div style={{ textAlign: "center", marginTop: 120, marginBottom: 120 }}>
      <Typography variant="h6">{translate("Page not found. 404")}</Typography>
    </div>
  );
}

export default PageNotFound;
