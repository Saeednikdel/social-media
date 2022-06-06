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
} from "../actions/types";

const initialState = {
  access: localStorage.getItem("access"),
  refresh: localStorage.getItem("refresh"),
  isAuthenticated: null,
  user: {
    id: null,
  },
  notification: [],
  bookmarks: [],
};

export default function (state = initialState, action) {
  const { type, payload, page } = action;

  switch (type) {
    case AUTHENTICATED_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("access", payload.access);
      return {
        ...state,
        isAuthenticated: true,
        access: payload.access,
        refresh: payload.refresh,
        login_error: null,
      };
    case USER_LOADED_SUCCESS:
      localStorage.setItem("id", payload.id);
      return {
        ...state,
        user: payload,
      };
    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        requestSuccess: true,
        signup_error: null,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
        set_pass_error: null,
      };
    case RESET_PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
        reset_pass_error: null,
      };
    case ACTIVATION_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
      };
    case SET_EMAIL_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
        set_email_error: null,
      };
    case SET_PASSWORD_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
      };
    //new
    case SET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
        set_detail_error: null,
      };
    case SET_USER_DETAIL_FAIL:
      return {
        ...state,
        requestFail: true,
        set_detail_error: payload,
      };
    case LOAD_BOOKMARK_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          bookmarks: payload.bookmarks,
          bookmark_count: payload.count,
        };
      } else {
        return {
          ...state,
          bookmarks: state.bookmarks.concat(payload.bookmarks),
          bookmark_count: payload.count,
        };
      }
    case NEW_POST_SUCCESS:
    case SET_COMMENTS_SUCCESS:
      return {
        ...state,
        requestSuccess: true,
      };
    case LOAD_NOTIF_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          notification: payload.notification,
          notif_count: payload.count,
        };
      } else {
        return {
          ...state,
          notification: state.notification.concat(payload.notification),
          notif_count: payload.count,
        };
      }

    case NEW_POST_FAIL:
    case SET_COMMENTS_FAIL:
      return {
        ...state,
        requestFail: true,
      };
    //
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        requestFail: true,
      };
    case RESET_PASSWORD_CONFIRM_FAIL:
      return {
        ...state,
        requestFail: true,
        reset_pass_error: payload,
      };
    case ACTIVATION_FAIL:
      return {
        ...state,
        requestFail: true,
      };
    case SET_EMAIL_FAIL:
      return {
        ...state,
        requestFail: true,
        set_email_error: payload,
      };
    case SET_PASSWORD_FAIL:
      return {
        ...state,
        requestFail: true,
        set_pass_error: payload,
      };
    //
    case AUTHENTICATED_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("id");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        notification: [],
        bookmarks: [],
      };
    case USER_LOADED_FAIL:
      localStorage.removeItem("access");
      localStorage.removeItem("id");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        notification: [],
        bookmarks: [],
      };
    case SIGNUP_FAIL:
      return {
        ...state,
        requestFail: true,
        signup_error: payload,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        requestFail: true,
        login_error: payload,
      };
    case LOGOUT:
      localStorage.removeItem("access");
      localStorage.removeItem("id");
      localStorage.removeItem("refresh");
      return {
        ...state,
        access: null,
        refresh: null,
        isAuthenticated: false,
        user: null,
        notification: [],
        bookmarks: [],
      };
    case RESET_STATE:
      return {
        ...state,
        requestSuccess: null,
        requestFail: null,
      };
    case LOAD_NOTIF_FAIL:
    case UPDATE_AVATAR_SUCCESS:
    case UPDATE_AVATAR_FAIL:
    case FOLLOW_SUCCESS:
    case FOLLOW_FAIL:
    case BOOKMARK_SUCCESS:
    case BOOKMARK_FAIL:
    case LOAD_BOOKMARK_FAIL:
    default:
      return state;
  }
}
