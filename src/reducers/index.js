import { combineReducers } from "redux";
import user from "./userReducer";
import post from "./postReducer";
import task from "./taskReducer";

export default combineReducers({ user, post, task });
