// @flow
// $FlowExpectedError
import type { NavigationState } from "react-navigation/src/TypeDefinition";
import Navigator from "../containers/Navigator";
import type { Action } from "../types";

export default (state: NavigationState, action: Action) => {
  if (action) {
    return Navigator.router.getStateForAction(action, state) || state;
  } else {
    return state;
  }
};
