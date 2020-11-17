import { CallMerge } from "@material-ui/icons";
import { createStore, compose, applyMiddleware } from "redux";
import { reducers } from "../reducers/index";
import thunk from "redux-thunk";

export const store=createStore(reducers
    ,    compose(
        applyMiddleware(thunk))
        );
store.subscribe(()=>console.log(store.getState));