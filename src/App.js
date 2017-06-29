// @flow
import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./store";
import ArSnake from "./containers/ArSnake";
import { watchPosition, getInitialPosition } from "./actions";

const store = configureStore();

store.dispatch(getInitialPosition());
store.dispatch(watchPosition());

export default class extends Component {
  render() {
    return (
      <Provider store={store}>
        <ArSnake />
      </Provider>
    );
  }
}
