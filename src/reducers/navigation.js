// @flow
import Navigator from "../containers/Navigator";
import type { Action } from "../types";

export default (state, action: Action) => {
  if (action) {
    return Navigator.router.getStateForAction(action, state) || state;
  } else {
    return state;
  }
};
