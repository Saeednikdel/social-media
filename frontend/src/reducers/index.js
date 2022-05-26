import { combineReducers } from "redux";
import auth from "./auth";
import blog from "./blog";
import message from "./message";

export default combineReducers({
  auth, ///this was like this auth: auth
  blog,
  message,
});
