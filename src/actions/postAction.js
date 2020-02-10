import { GET_BY_ID, LOADING, ERROR } from "../types/postTypes";
import { GET_USERS } from "../types/usuariosTypes";
import axios from "axios";

export const getPostsById = id => async (dispatch, getState) => {
  const { user } = getState();
  const { users } = user;
  if (user.error || "postIndex" in users[id]) {
    return;
  }
  const userId = users[id].id;
  const { posts } = getState().post;
  try {
    dispatch({ type: LOADING });
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
    );
    const newObjPost = response.data.map(post => {
      return {
        ...post,
        comments: [],
        isOpen: false
      };
    });
    const currentPosts = [...posts, newObjPost];

    dispatch({ type: GET_BY_ID, payload: currentPosts });

    const postIndex = currentPosts.length - 1;
    const currentUsers = [...users];
    currentUsers[id] = { ...currentUsers[id], postIndex };
    dispatch({ type: GET_USERS, payload: currentUsers });
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: error.message
    });
    console.log(error);
  }
};

export const openClose = (userId, index) => (dispatch, getState) => {
  const { posts } = getState().post;
  const newPosts = {
    ...posts,
    [userId] : {
      ...posts[userId],
      [index] : {
        ...posts[userId][index],
        isOpen: !posts[userId][index].isOpen
      }
    }
  };
  console.log(posts);
  console.log(newPosts);
  // dispatch({ type: GET_BY_ID, payload: Object.values(newPosts) });
};
