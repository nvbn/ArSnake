// @flow
import { StackNavigator } from "react-navigation";
import * as constants from "../constants";
import StartMenu from "./StartMenu";
import Game from "./Game";

export default StackNavigator(
  {
    [constants.ROUTE_START_MENU]: {
      screen: StartMenu,
    },
    [constants.ROUTE_GAME]: {
      screen: Game,
    },
  },
  {
    initialRouteName: constants.ROUTE_START_MENU,
    initialRouteParams: {},
    headerMode: "none",
  },
);
