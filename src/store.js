import { combineReducers, createStore, applyMiddleware, compose } from "redux";
import { selectListReducer, searchReducer } from "./Utils/reducers";

const rootReducer = combineReducers({ selectedList: selectListReducer, searchQuery: searchReducer });

const initalState = { selectedList: "", searchQuery: "" };

const store = createStore(rootReducer, initalState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;
