import axios from "axios";
import { GET_TASKS, LOADING, ERROR } from "../types/taskTypes";

export const getTasks = () => async dispatch => {
  dispatch({ type: LOADING })
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );
    const tasks = {};
    response.data.map((task) => {
      tasks[task.userId] = {
        ...tasks[task.userId],
        [task.id]: {
          ...task
        }
      }
      return tasks;
    })
    dispatch({
      type: GET_TASKS,
      payload: tasks
    });
  } catch (error) {
    console.error('Informacion de tareas no disponible');
    dispatch({
      type: ERROR,
      payload: error.message
    });
  }
};
