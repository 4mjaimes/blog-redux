import { UPDATE_POST, LOADING, ERROR, COMMENTS_LOADING, COMMENTS_ERROR, UPDATE_COMMENTS_POST } from "../types/postTypes";
const INITIAL_STATE = {
  posts: [],
  loading: false,
  error: null,
  commentsLoading: false,
  commentsError: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_POST:
      return { ...state, posts: action.payload, loading: false, error: null };
    case LOADING:
      return{...state, loading: true};
    case ERROR:
      return{...state, error: action.payload, loading: false};
    case UPDATE_COMMENTS_POST:
      return { ...state, posts: action.payload, commentsLoading: false, error: null };
    case COMMENTS_LOADING:
      return{...state, commentsLoading: true};
    case COMMENTS_ERROR:
      return{...state, commentsError: action.payload, commentsLoading: false};
    default:
      return state;
  }
};
