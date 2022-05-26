import axios from "axios";
import {
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAIL,
  LOGOUT,
  LIKE_SUCCESS,
  LIKE_FAIL,
  LOAD_COMMENTS_SUCCESS,
  LOAD_COMMENTS_FAIL,
  LOAD_LIKE_SUCCESS,
  LOAD_LIKE_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAIL,
} from "./types";
import { load_bookmark } from "./auth";
export const load_posts = (page, keyword) => async (dispatch) => {
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
      `${process.env.REACT_APP_API_URL}/api/blog/post-list/${page}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_POSTS_FAIL,
    });
  }
};
export const load_user_posts = (userId, page) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/blog/user-post-list/${userId}/${page}/`,
      config
    );
    dispatch({
      type: LOAD_USER_POSTS_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_USER_POSTS_FAIL,
    });
  }
};

export const load_post = (postId) => async (dispatch) => {
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
      `${process.env.REACT_APP_API_URL}/api/blog/post-detail/${postId}/`,
      body,
      config
    );

    dispatch({
      type: LOAD_POST_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_POST_FAIL,
    });
  }
};

export const load_profile = (target_id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  const user = localStorage.getItem("id");
  const body = JSON.stringify({ user, target_id });
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/blog/profile-detail/`,
      body,
      config
    );

    dispatch({
      type: LOAD_PROFILE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_FAIL,
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

export const load_likes =
  (postId, page = 1) =>
  async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/blog/like-list/${postId}/${page}/`,
        config
      );
      dispatch({
        type: LOAD_LIKE_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOAD_LIKE_FAIL,
      });
    }
  };
export const like = (id) => async (dispatch) => {
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
        `${process.env.REACT_APP_API_URL}/api/blog/like/`,
        body,
        config
      );
      dispatch({
        type: LIKE_SUCCESS,
        payload: res.data,
      });
      dispatch(load_post(id));
      dispatch(load_likes(id));
    } catch (err) {
      dispatch({
        type: LIKE_FAIL,
      });
    }
  } else {
    dispatch({
      type: LIKE_FAIL,
    });
  }
};

export const logout2 = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
