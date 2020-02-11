import { UPDATE_POST, LOADING, ERROR, COMMENTS_LOADING, COMMENTS_ERROR, UPDATE_COMMENTS_POST } from "../types/postTypes";
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

    dispatch({ type: UPDATE_POST, payload: currentPosts });

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
  const postSelected = posts[userId][index];
  const updated = {
    ...postSelected,
    isOpen: !postSelected.isOpen
  };
  const postUpdated = [...posts];
  postUpdated[userId] = [...postUpdated[userId]];
  postUpdated[userId][index] = updated;
  // const newPosts = {
  //   ...posts,
  //   [userId] : {
  //     ...posts[userId],
  //     [index] : {
  //       ...posts[userId][index],
  //       isOpen: !posts[userId][index].isOpen
  //     }
  //   }
  // };
  dispatch({ type: UPDATE_POST, payload: postUpdated});
};

export const getComments = (userId, index) => async (dispatch, getState) => {
  dispatch({ type: COMMENTS_LOADING });
  const { posts } = getState().post;
  const postSelected = posts[userId][index];
  try {
    const response = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postSelected.id}`);
    const updated = {
      ...postSelected,
      comments: response.data
    };
    const postUpdated = [...posts];
    postUpdated[userId] = [...postUpdated[userId]];
    postUpdated[userId][index] = updated;
    dispatch({ type: UPDATE_COMMENTS_POST, payload: postUpdated});
  } catch (error) {
    console.error(error);
    dispatch({ type: COMMENTS_ERROR, payload: error });
  }
};
