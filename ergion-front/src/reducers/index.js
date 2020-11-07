import { ContactsRounded } from "@material-ui/icons";
import {combineReducers} from "redux";
import { courseReducer } from "./Course";

export const reducers=combineReducers(
    {
course:courseReducer,
    }
);