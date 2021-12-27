import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { exchangeRates } from "./exchangeRates/reducers";


const reducers = combineReducers({
  exchangeRates
});

const composeEnhancer =
  process.env.NODE_ENV === "production"
    ? applyMiddleware(thunk)
    : composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducers, composeEnhancer);
