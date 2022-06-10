import axios from "axios";
import {
  LOAD_RESUME_SUCCESS,
  LOAD_RESUME_FAIL,
  ADD_EDUCATION_SUCCESS,
  ADD_EDUCATION_FAIL,
  ADD_LANGUAGE_SUCCESS,
  ADD_LANGUAGE_FAIL,
  ADD_SKILL_SUCCESS,
  ADD_SKILL_FAIL,
  ADD_JOB_HISTORY_SUCCESS,
  ADD_JOB_HISTORY_FAIL,
} from "./types";

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

export const add_education =
  (id, title, campus, end_date, score) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const user = localStorage.getItem("id");
      const body = JSON.stringify({ id, user, title, campus, end_date, score });
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/education/`,
          body,
          config
        );
        dispatch({
          type: ADD_EDUCATION_SUCCESS,
          payload: res.data,
        });
        dispatch(load_resume());
      } catch (err) {
        dispatch({
          type: ADD_EDUCATION_FAIL,
        });
      }
    }
  };

export const add_language = (id, title, level) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user = localStorage.getItem("id");
    const body = JSON.stringify({ id, user, title, level });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/language/`,
        body,
        config
      );
      dispatch({
        type: ADD_LANGUAGE_SUCCESS,
        payload: res.data,
      });
      dispatch(load_resume());
    } catch (err) {
      dispatch({
        type: ADD_LANGUAGE_FAIL,
      });
    }
  }
};

export const add_skill = (id, title, level) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user = localStorage.getItem("id");
    const body = JSON.stringify({ id, user, title, level });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/skill/`,
        body,
        config
      );
      dispatch({
        type: ADD_SKILL_SUCCESS,
        payload: res.data,
      });
      dispatch(load_resume());
    } catch (err) {
      dispatch({
        type: ADD_SKILL_FAIL,
      });
    }
  }
};

export const add_job =
  (id, title, start_date, end_date, company) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const user = localStorage.getItem("id");
      const body = JSON.stringify({
        id,
        user,
        title,
        start_date,
        end_date,
        company,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/job_history/`,
          body,
          config
        );
        dispatch({
          type: ADD_JOB_HISTORY_SUCCESS,
          payload: res.data,
        });
        dispatch(load_resume());
      } catch (err) {
        dispatch({
          type: ADD_JOB_HISTORY_FAIL,
        });
      }
    }
  };
