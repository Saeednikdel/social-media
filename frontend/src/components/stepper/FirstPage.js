import React from "react";
import { connect } from "react-redux";

export const FirstPage = (props) => {
  return <div>FirstPage</div>;
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(FirstPage);
