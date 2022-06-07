import React, { useEffect } from "react";
import { connect } from "react-redux";
import Redirect from "react-router-dom/es/Redirect";
import { load_resume } from "../actions/resume";
import Education from "../components/ResumeViews/Education";
import Language from "../components/ResumeViews/Language";
import Skills from "../components/ResumeViews/Skills";
import JobHistory from "../components/ResumeViews/JobHistory";
import InfoPage from "../components/ResumeViews/InfoPage";
const ResumeCreator = ({ isAuthenticated, load_resume, resume }) => {
  useEffect(() => {
    load_resume();
  }, []);
  if (isAuthenticated === false) return <Redirect to="/login" />;

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
  isAuthenticated: state.auth.isAuthenticated,
  resume: state.resume.resume,
});
export default connect(mapStateToProps, { load_resume })(ResumeCreator);
