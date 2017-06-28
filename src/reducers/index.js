// @flow
import { combineReducers } from "redux";
import game from "./game";
import position from "./position";
import navigation from "./navigation";

export default combineReducers({ game, position, navigation });
