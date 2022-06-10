import {
  LOAD_JOBS_SUCCESS,
  LOAD_JOBS_FAIL,
  LOAD_JOB_SUCCESS,
  LOAD_JOB_FAIL,
  LOAD_COMMENTS_SUCCESS,
  LOAD_USER_JOBS_SUCCESS,
  LOAD_USER_JOBS_FAIL,
  BOOKMARK_JOB_SUCCESS,
  BOOKMARK_JOB_FAIL,
  LOAD_BOOKMARK_JOB_SUCCESS,
  LOAD_BOOKMARK_JOB_FAIL,
} from "../actions/types";
const initialState = {
  jobs: [],
  userjobs: [],
};

export default function (state = initialState, action) {
  const { type, payload, page, keyword } = action;

  switch (type) {
    case LOAD_JOBS_SUCCESS:
      if (page === 1) {
        return {
          ...state,
          jobs: payload.jobs,
          jobs_count: payload.count,
        };
      } else {
        return {
          ...state,
          jobs: state.jobs.concat(payload.jobs),
          jobs_count: payload.count,
        };
      }
    case LOAD_USER_JOBS_SUCCESS:
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
    case LOAD_JOB_SUCCESS:
      return {
        ...state,
        job: payload,
      };

    case LOAD_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: payload,
      };
    case LOAD_BOOKMARK_JOB_SUCCESS:
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
    case LOAD_BOOKMARK_JOB_FAIL:
    case LOAD_JOBS_FAIL:
    case LOAD_JOB_FAIL:
    case LOAD_USER_JOBS_FAIL:
    default:
      return state;
  }
}
