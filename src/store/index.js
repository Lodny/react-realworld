// import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { createStore } from "redux";
// import thunk from "redux-thunk";
// import { productReducer } from "./reducers/productReducer";
// import { cartReducer } from "./reducers/cartReducer";
// import { orderReducer } from "./reducers/orderReducer";

// const initialState = {};
// const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_CPMPOSE__ || compose;
const store = createStore(
  {
    products: []
  }
  // combineReducers({
  //order: orderReducer
  // }),
  // initialState,
  // composeEnhancer(applyMiddleware(thunk))
);

export default store;
