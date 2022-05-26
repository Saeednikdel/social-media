import {
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAIL,
  LOGOUT,
  BOOKMARK_SUCCESS,
  BOOKMARK_FAIL,
  LOAD_COMMENTS_SUCCESS,
  LOAD_MENU_SUCCESS,
  LOAD_LIKE_SUCCESS,
  LOAD_LIKE_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAIL,
} from "../actions/types";
const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case LOAD_POSTS_SUCCESS:
      return {
        ...state,
        posts: payload,
        post: null,
        replies: null,
      };
    case LOAD_USER_POSTS_SUCCESS:
      return {
        ...state,
        userposts: payload,
      };
    case LOAD_POST_SUCCESS:
      return {
        ...state,
        post: payload,
      };
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      };
    case LOAD_MENU_SUCCESS:
      return {
        ...state,
        category: payload,
      };
    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
      };
    case LOAD_LIKE_SUCCESS:
      return {
        ...state,
        likes: payload,
      };
    case LOGOUT:
      localStorage.removeItem("id");
      return {
        ...state,
        order: null,
      };

    case LOAD_POSTS_FAIL:
    case LOAD_POST_FAIL:
    case LOAD_LIKE_FAIL:
    case LOAD_PROFILE_FAIL:
    case LOAD_USER_POSTS_FAIL:
    default:
      return state;
  }
}
