import axios from "axios";
import {
  LOAD_MSG_SUCCESS,
  LOAD_MSG_FAIL,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAIL,
} from "./types";
export const load_msg = (room) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/message/room/${room}/`,
      config
    );

    dispatch({
      type: LOAD_MSG_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_MSG_FAIL,
    });
  }
};
export const load_rooms = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const user = localStorage.getItem("id");
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/message/room-list/${user}/`,
      config
    );

    dispatch({
      type: LOAD_ROOMS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_ROOMS_FAIL,
    });
  }
};
