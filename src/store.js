import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { selectListReducer } from "./Utils/reducers";

const rootReducer = combineReducers({ selectedList: selectListReducer });

const initalState = { selectedList: "" };

const store = createStore(rootReducer, initalState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
