import { combineReducers, createStore } from "redux";
import { userReducer } from "./user/reducer";

const reducer = combineReducers({ user: userReducer })

export const store = createStore(reducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__())