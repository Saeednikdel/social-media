import React, { useEffect } from "react";
import { connect } from "react-redux";
import { load_resume } from "../actions/resume";
import Education from "../components/ResumeViews/Education";
import Language from "../components/ResumeViews/Language";
import Skills from "../components/ResumeViews/Skills";
import JobHistory from "../components/ResumeViews/JobHistory";
import InfoPage from "../components/ResumeViews/InfoPage";
const ResumeSetting = ({ load_resume, resume }) => {
  useEffect(() => {
    load_resume();
  }, []);

  return (
    <div style={{ minHeight: 400, margin: 10 }}>
      {resume && (
        <>
          <InfoPage />
          <Education />
          <JobHistory />
          <Language />
          <Skills />
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  resume: state.resume.resume,
});
export default connect(mapStateToProps, { load_resume })(ResumeSetting);
