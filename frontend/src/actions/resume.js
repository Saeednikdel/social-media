import axios from "axios";
import { LOAD_RESUME_SUCCESS, LOAD_RESUME_FAIL } from "./types";

export const load_resume = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user = localStorage.getItem("id");
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/resume/${user}/`,
        config
      );
      dispatch({
        type: LOAD_RESUME_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_RESUME_FAIL,
      });
    }
  }
};
