import {
  LOAD_MSG_SUCCESS,
  LOAD_MSG_FAIL,
  LOAD_ROOMS_SUCCESS,
  LOAD_ROOMS_FAIL,
} from "../actions/types";
const initialState = { message: [], rooms: [] };

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_MSG_SUCCESS:
      return {
        ...state,
        message: state.message.concat(payload.msg),
        msg_count: payload.count,
      };
    case LOAD_ROOMS_SUCCESS:
      return {
        ...state,
        rooms: state.rooms.concat(payload.rooms),
        room_count: payload.count,
        message: [],
        msg_count: 0,
      };
    case LOAD_MSG_FAIL:
    case LOAD_ROOMS_FAIL:
    default:
      return state;
  }
}
