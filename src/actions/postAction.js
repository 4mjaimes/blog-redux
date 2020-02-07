import { GET_POST, LOADING, ERROR } from "../types/postTypes";
import axios from 'axios';


export const getPost = () => async (dispatch) => {
  try {
    dispatch({ type: LOADING })
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch({type: GET_POST, payload: response.data})
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    });
    console.log(error);
  }
}