import {
  LOAD_RESUME_SUCCESS,
  LOAD_RESUME_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_FAIL,
  ADD_SKILL_SUCCESS,
  ADD_SKILL_FAIL,
  ADD_JOB_SUCCESS,
  ADD_JOB_FAIL,
} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_RESUME_SUCCESS:
      return {
        ...state,
        resume: payload,
      };
    case ADD_EDUCATION_SUCCESS:
      return {
        ...state,
        new_edu: payload,
      };
    case ADD_LANGUAGE_SUCCESS:
      return {
        ...state,
        new_lang: payload,
      };
    case ADD_JOB_SUCCESS:
      return {
        ...state,
        new_job: payload,
      };
    case ADD_SKILL_SUCCESS:
      return {
        ...state,
        new_skill: payload,
      };
    case ADD_EDUCATION_FAIL:
      return {
        ...state,
        new_edu: "error",
      };
    case ADD_JOB_FAIL:
      return {
        ...state,
        new_job: "error",
      };
    case ADD_LANGUAGE_FAIL:
      return {
        ...state,
        new_lang: "error",
      };
    case ADD_SKILL_FAIL:
      return {
        ...state,
        new_skill: "error",
      };
    case LOAD_RESUME_FAIL:
    default:
      return state;
  }
}
