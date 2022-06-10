import axios from "axios";
import {
  LOAD_JOBS_SUCCESS,
  LOAD_JOBS_FAIL,
  LOAD_JOB_SUCCESS,
  LOAD_JOB_FAIL,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAIL,
  LOAD_USER_JOBS_SUCCESS,
  LOAD_USER_JOBS_FAIL,
  BOOKMARK_JOB_SUCCESS,
  BOOKMARK_JOB_FAIL,
  LOAD_BOOKMARK_JOB_SUCCESS,
  LOAD_BOOKMARK_JOB_FAIL,
} from "./types";
export const load_jobs = (page, keyword) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const user = localStorage.getItem("id") ? localStorage.getItem("id") : false;
  const body = JSON.stringify({
    keyword,
    page,
    user,
  });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/jobs/job-list/${page}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_JOBS_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_JOBS_FAIL,
    });
  }
};
export const load_user_posts = (name, page) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/jobs/user-job-list/${name}/${page}/`,
      config
    );
    dispatch({
      type: LOAD_USER_JOBS_SUCCESS,
      payload: res.data,
      page: page,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_JOBS_FAIL,
    });
  }
};

export const load_job = (jobId) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const user = localStorage.getItem("id") ? localStorage.getItem("id") : false;
  const body = JSON.stringify({ user });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/jobs/job-detail/${jobId}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_JOB_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_JOB_FAIL,
    });
  }
};
export const bookmark_job = (id) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user = localStorage.getItem("id");
    const body = JSON.stringify({ user, id });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/jobs/bookmark/`,
        body,
        config
      );
      dispatch({
        type: BOOKMARK_JOB_SUCCESS,
        payload: res.data,
      });
      dispatch(load_job(id));
    } catch (err) {
      dispatch({
        type: BOOKMARK_JOB_FAIL,
      });
    }
  } else {
    dispatch({
      type: BOOKMARK_JOB_FAIL,
    });
  }
};
export const load_bookmark =
  (page = 1) =>
  async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const userId = localStorage.getItem("id");
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/jobs/bookmark-list/${userId}/${page}/`,
          config
        );

        dispatch({
          type: LOAD_BOOKMARK_JOB_SUCCESS,
          payload: res.data,
          page: page,
        });
      } catch (err) {
        dispatch({
          type: LOAD_BOOKMARK_JOB_FAIL,
        });
      }
    } else {
      dispatch({
        type: LOAD_BOOKMARK_JOB_FAIL,
      });
    }
  };

export const load_replies =
  (item, page = 1) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/comment-list/${item}/${page}/`,
        config
      );

      dispatch({
        type: LOAD_COMMENTS_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_COMMENTS_FAIL,
      });
    }
  };
