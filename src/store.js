// @flow
import { AsyncStorage } from "react-native";
import { createStore, applyMiddleware } from "redux";
import type { Store } from "redux";
import thunk from "redux-thunk";
import { persistStore } from "redux-persist";
import { State } from "./types";
import reducers from "./reducers";

export default (): Store<State> => {
  const store = createStore(reducers, undefined, applyMiddleware(thunk));
  persistStore(store, { storage: AsyncStorage });
  return store;
};
