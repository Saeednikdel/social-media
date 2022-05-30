import axios from "axios";
import { logout2, load_replies } from "./blog";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  ACTIVATION_SUCCESS,
  ACTIVATION_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  RESET_PASSWORD_CONFIRM_SUCCESS,
  RESET_PASSWORD_CONFIRM_FAIL,
  SET_EMAIL_SUCCESS,
  SET_EMAIL_FAIL,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAIL,
  LOGOUT,
  USER_LOADED_SUCCESS,
  USER_LOADED_FAIL,
  AUTHENTICATED_FAIL,
  AUTHENTICATED_SUCCESS,
  RESET_STATE,
  SET_USER_DETAIL_FAIL,
  SET_USER_DETAIL_SUCCESS,
  LOAD_BOOKMARK_FAIL,
  LOAD_BOOKMARK_SUCCESS,
  SET_COMMENTS_FAIL,
  SET_COMMENTS_SUCCESS,
  BOOKMARK_SUCCESS,
  BOOKMARK_FAIL,
  NEW_POST_SUCCESS,
  NEW_POST_FAIL,
  FOLLOW_SUCCESS,
  FOLLOW_FAIL,
  UPDATE_AVATAR_SUCCESS,
  UPDATE_AVATAR_FAIL,
  LOAD_NOTIF_SUCCESS,
  LOAD_NOTIF_FAIL,
} from "./types";
import { load_post, load_profile } from "./blog";

export const load_notif =
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
          `${process.env.REACT_APP_API_URL}/api/notification/${userId}/${page}/`,
          config
        );

        dispatch({
          type: LOAD_NOTIF_SUCCESS,
          payload: res.data,
        });
      } catch (err) {
        dispatch({
          type: LOAD_NOTIF_FAIL,
        });
      }
    } else {
      dispatch({
        type: LOAD_NOTIF_FAIL,
      });
    }
  };
export const update_avatar = (image, path) => async (dispatch) => {
  let formData = new FormData();
  const user = localStorage.getItem("id");
  if (path === "avatar") {
    formData.append("image", image);
  } else {
    formData.append("header", image);
  }

  formData.append("id", user);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `JWT ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/accounts/${path}/`,
      formData,
      config
    );
    dispatch({
      type: UPDATE_AVATAR_SUCCESS,
    });
    dispatch(load_user());
  } catch (err) {
    dispatch({
      type: UPDATE_AVATAR_FAIL,
    });
  }
};
export const follow_unfollw = (target_id) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user = localStorage.getItem("id");
    const body = JSON.stringify({ user, target_id });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/accounts/follow/`,
        body,
        config
      );
      dispatch({
        type: FOLLOW_SUCCESS,
      });
      dispatch(load_profile(target_id));
    } catch (err) {
      dispatch({
        type: FOLLOW_FAIL,
      });
    }
  }
};
export const new_post = (content) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user = localStorage.getItem("id");
    const body = JSON.stringify({ user, content });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/blog/post-create/`,
        body,
        config
      );

      dispatch({
        type: NEW_POST_SUCCESS,
      });
    } catch (err) {
      dispatch({
        type: NEW_POST_FAIL,
      });
    }
  }
};
export const comment = (item, star, title, description) => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };
    const user = localStorage.getItem("id");
    const body = JSON.stringify({ user, item, star, title, description });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/comment/`,
        body,
        config
      );

      dispatch({
        type: SET_COMMENTS_SUCCESS,
      });
      dispatch(load_replies(item, 1));
    } catch (err) {
      dispatch({
        type: SET_COMMENTS_FAIL,
      });
    }
  }
};

export const set_user_detail =
  (id, name, bio, phone_no, birth_date) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };
      const body = JSON.stringify({
        id,
        name,
        bio,
        phone_no,
        birth_date,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/accounts/user-set/`,
          body,
          config
        );

        dispatch({
          type: SET_USER_DETAIL_SUCCESS,
          payload: res.data,
        });
        dispatch(load_user());
      } catch (err) {
        dispatch({
          type: SET_USER_DETAIL_FAIL,
        });
      }
    } else {
      dispatch({
        type: SET_USER_DETAIL_FAIL,
      });
    }
  };
export const bookmark = (id, page) => async (dispatch) => {
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
        `${process.env.REACT_APP_API_URL}/api/blog/bookmark/`,
        body,
        config
      );
      dispatch({
        type: BOOKMARK_SUCCESS,
        payload: res.data,
      });
      if (page) {
        dispatch(load_bookmark(page));
      } else {
        dispatch(load_post(id));
      }
    } catch (err) {
      dispatch({
        type: BOOKMARK_FAIL,
      });
    }
  } else {
    dispatch({
      type: BOOKMARK_FAIL,
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
          `${process.env.REACT_APP_API_URL}/api/blog/bookmark-list/${userId}/${page}/`,
          config
        );

        dispatch({
          type: LOAD_BOOKMARK_SUCCESS,
          payload: res.data,
          page: page,
        });
      } catch (err) {
        dispatch({
          type: LOAD_BOOKMARK_FAIL,
        });
      }
    } else {
      dispatch({
        type: LOAD_BOOKMARK_FAIL,
      });
    }
  };
export const checkAuthenticated = () => async (dispatch) => {
  if (typeof window == "undefined") {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ token: localStorage.getItem("access") });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
        body,
        config
      );

      if (res.data.code !== "token_not_valid") {
        dispatch({
          type: AUTHENTICATED_SUCCESS,
        });
      } else {
        dispatch({
          type: AUTHENTICATED_FAIL,
        });
      }
    } catch (error) {
      dispatch({
        type: AUTHENTICATED_FAIL,
      });
    }
  } else {
    dispatch({
      type: AUTHENTICATED_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    };

    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/auth/users/me/`,
        config
      );

      dispatch({
        type: USER_LOADED_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: USER_LOADED_FAIL,
      });
    }
  } else {
    dispatch({
      type: USER_LOADED_FAIL,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const signup =
  ({ name, email, password, re_password }) =>
  async (dispatch) => {
    // const csrftoken = getCookie("csrftoken");

    const config = {
      headers: {
        "Content-Type": "application/json",
        // "X-CSRFToken": csrftoken,
      },
    };

    const body = JSON.stringify({ name, email, password, re_password });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/`,
        body,
        config
      );

      dispatch({
        type: SIGNUP_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      // console.log("request.status", error.request.status);
      // console.log("request.response", error.request.response);
      // console.log("message", error.message);
      dispatch({
        type: SIGNUP_FAIL,
      });
    }
  };

export const verify = (uid, token) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ uid, token });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
      body,
      config
    );

    dispatch({
      type: ACTIVATION_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ACTIVATION_FAIL,
    });
  }
};

export const reset_password = (email) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
      body,
      config
    );

    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAIL,
    });
  }
};

export const reset_password_confirm =
  (uid, token, new_password, re_new_password) => async (dispatch) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
        body,
        config
      );

      dispatch({
        type: RESET_PASSWORD_CONFIRM_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_CONFIRM_FAIL,
      });
    }
  };
export const set_email =
  (new_email, re_new_email, current_password) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        new_email,
        re_new_email,
        current_password,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/users/set_email/`,
          body,
          config
        );
        dispatch({
          type: SET_EMAIL_SUCCESS,
        });
        dispatch(load_user());
      } catch (error) {
        dispatch({
          type: SET_EMAIL_FAIL,
        });
      }
    }
  };
export const set_password =
  (new_password, re_new_password, current_password) => async (dispatch) => {
    if (localStorage.getItem("access")) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${localStorage.getItem("access")}`,
          Accept: "application/json",
        },
      };

      const body = JSON.stringify({
        new_password,
        re_new_password,
        current_password,
      });

      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/users/set_password/`,
          body,
          config
        );
        dispatch({
          type: SET_PASSWORD_SUCCESS,
        });
      } catch (error) {
        dispatch({
          type: SET_PASSWORD_FAIL,
        });
      }
    }
  };
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch(logout2({ type: LOGOUT }));
};
export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE });
};
