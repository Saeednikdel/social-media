import React from "react";
import FirstPage from "./FirstPage";
import Language from "./Language";
import Skills from "./Skills";
import JobHistory from "./JobHistory";
import Education from "./Education";
import OverView from "./OverView";
function Container({ step, handleChange }) {
  switch (step) {
    case 0:
      return <FirstPage />;
    case 1:
      return <Education />;
    case 2:
      return <Language />;
    case 3:
      return <JobHistory />;
    case 4:
      return <Skills />;
    case 5:
      return <OverView />;
    default:
      return <h2>error</h2>;
  }
}

export default Container;
