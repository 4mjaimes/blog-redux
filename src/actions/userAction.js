import axios from "axios";
import { GET_USERS, LOADING, ERROR } from "../types/usuariosTypes";

export const getUsers = () => async dispatch => {
  dispatch({ type: LOADING })
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/users"
    );
    dispatch({
      type: GET_USERS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    });
  }
};
