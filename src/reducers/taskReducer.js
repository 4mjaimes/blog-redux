import { GET_TASKS, LOADING, ERROR } from "../types/taskTypes";
const INITIAL_STATE = {
  tasks: {},
  loading: false,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_TASKS:
      return { ...state, tasks: action.payload, loading: false, error: null };
    case LOADING:
      return{...state, loading: true};
    case ERROR:
      return{...state, error: action.payload, loading: false};
    default:
      return state;
  }
};
