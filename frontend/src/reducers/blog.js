import {
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAIL,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAIL,
  LOGOUT,
  LOAD_COMMENTS_SUCCESS,
  LOAD_LIKE_SUCCESS,
  LOAD_LIKE_FAIL,
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_FAIL,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAIL,
} from "../actions/types";
const initialState = { posts: [], userposts: [] };

export default function (state = initialState, action) {
  const { type, payload, page } = action;

  switch (type) {
    case LOAD_POSTS_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          posts: payload.posts,
          count: payload.count,
        };
      } else {
        return {
          ...state,
          posts: state.posts.concat(payload.posts),
          count: payload.count,
        };
      }

    case LOAD_USER_POSTS_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          userposts: payload.posts,
          profile_count: payload.count,
        };
      } else {
        return {
          ...state,
          userposts: state.userposts.concat(payload.posts),
          profile_count: payload.count,
        };
      }
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
    case LOAD_POSTS_FAIL:
    case LOAD_POST_FAIL:
    case LOAD_LIKE_FAIL:
    case LOAD_PROFILE_FAIL:
    case LOAD_USER_POSTS_FAIL:
    default:
      return state;
  }
}
