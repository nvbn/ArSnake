// @flow
import { NavigationActions } from "react-navigation";
import type {
  Position,
  ThunkAction,
  PositionChangedAction,
  InitGameAction,
} from "./types";
import * as constants from "./constants";

export const watchPosition = (): ThunkAction => dispatch =>
  navigator.geolocation.watchPosition(
    ({ coords }) => {
      const position = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      dispatch(positionChanged(position));
    },
    error => console.warn("Can't get location", error),
    constants.POSITION_OPTIONS,
  );

export const positionChanged = (position: Position): PositionChangedAction => ({
  type: constants.ACTION_POSITION_CHANGED,
  position,
});

export const startGame = (): ThunkAction => dispatch =>
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const position = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      dispatch(initGame(position));
      dispatch(
        NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({
              routeName: constants.ROUTE_GAME,
            }),
          ],
        }),
      );
    },
    error => console.warn("Can't get location", error),
    constants.POSITION_OPTIONS,
  );

export const initGame = (position: Position): InitGameAction => ({
  type: constants.ACTION_INIT_GAME,
  position,
});

export const skipCandy = (): ThunkAction => dispatch =>
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => {
      const position = {
        latitude: coords.latitude,
        longitude: coords.longitude,
      };

      dispatch(skippedCandy(position));
    },
    error => console.warn("Can't get location", error),
    constants.POSITION_OPTIONS,
  );

export const skippedCandy = (position: Position) => ({
  type: constants.ACTION_SKIPPED_CANDY,
  position,
});
