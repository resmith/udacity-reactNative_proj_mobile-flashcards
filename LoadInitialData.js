import React, { Fragment } from "react";
import { connect } from "react-redux";
import { loadInitialData, loadData } from "./src/redux/actions";

// The purpose of this is just to load data
// This could not be put in App.js, because it is not wrapped in the provider/store
function LoadInitialData() {
  return <Fragment />;
}

const mapStateToProps = (state) => {
  console.log("LoadInitialData component mapStateToProps b4 call");
  const decks = loadInitialData(state);
  console.log("LoadInitialData component decks:", decks);
  console.log("LoadInitialData component state:", state);
  return { decks };
};

export default connect(mapStateToProps)(LoadInitialData);
