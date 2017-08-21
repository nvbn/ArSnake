// @flow
import * as constants from "../constants";
import type { Action, Position } from "../types";

export default (state: Position, action: Action): ?Position => {
  switch (action.type) {
    case constants.ACTION_POSITION_CHANGED:
      return action.position;
    default:
      return state || null;
  }
};
