import { LOAD_RESUME_SUCCESS, LOAD_RESUME_FAIL } from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_RESUME_SUCCESS:
      return {
        ...state,
        resume: payload,
      };
    case LOAD_RESUME_FAIL:
    default:
      return state;
  }
}
