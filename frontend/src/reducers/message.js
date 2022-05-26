import {
  LOAD_MSG_SUCCESS,
  LOAD_MSG_FAIL,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAIL,
} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MSG_SUCCESS:
      return {
        ...state,
        message: payload,
      };
    case LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: payload,
      };
    case LOAD_MSG_FAIL:
    case LOAD_ROOMS_FAIL:
    default:
      return state;
  }
}
