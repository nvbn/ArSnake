// @flow
// $FlowExpectedError
import { NavigationActions } from "react-navigation";
import { isEqual } from "lodash";
import type {
  Position,
  ThunkAction,
  PositionChangedAction,
  InitGameAction,
  SnakeTouchedHimself,
  SnakeTouchedCandy,
  SnakeMoved,
} from "./types";
import * as constants from "./constants";
import {
  generateCandy,
  isTouched,
  generatePositions,
  isSnakeTouchedHimself,
} from "./utils";

// Plain actions:

export const snakeTouchedHimself = (): SnakeTouchedHimself => ({
  type: constants.ACTION_SNAKE_TOUCHED_HIMSELF,
});

export const snakeTouchedCandy = (
  positions: Position[],
  candy: Position,
): SnakeTouchedCandy => ({
  type: constants.ACTION_SNAKE_TOUCHED_CANDY,
  positions,
  candy,
});

export const snakeMoved = (positions: Position[]): SnakeMoved => ({
  type: constants.ACTION_SNAKE_MOVED,
  positions,
});

export const positionChanged = (position: Position): PositionChangedAction => ({
  type: constants.ACTION_POSITION_CHANGED,
  position,
});

export const initGame = (
  position: Position,
  candy: Position,
): InitGameAction => ({
  type: constants.ACTION_INIT_GAME,
  position,
  candy,
});

export const candyCreated = (candy: Position) => ({
  type: constants.ACTION_CANDY_CREATED,
  candy,
});

// Thunk actions:

export const getInitialPosition = (): ThunkAction => dispatch =>
  navigator.geolocation.getCurrentPosition(
    ({ coords }) => dispatch(positionChanged(coords)),
    error => console.warn("Can't get location", error),
    // $FlowExpectedError
    constants.FAST_POSITION_OPTIONS,
  );

export const watchPosition = (): ThunkAction => (dispatch, getState) =>
  navigator.geolocation.watchPosition(
    async ({ coords }) => {
      dispatch(positionChanged(coords));

      const { game } = getState();
      if (game.status === constants.STATUS_IN_PROGRESS) {
        const snakePosition = [
          ...generatePositions(game.snake.positions, coords, game.snake.size),
        ];

        if (isSnakeTouchedHimself(snakePosition)) {
          dispatch(snakeTouchedHimself());
        } else if (
          game.candy &&
          isTouched(coords, game.candy, constants.CANDY_TOUCH_RADIUS)
        ) {
          const candy = await generateCandy(coords);
          dispatch(snakeTouchedCandy(snakePosition, candy));
        } else if (!isEqual(game.snake.positions, snakePosition)) {
          dispatch(snakeMoved(snakePosition));
        }
      }
    },
    error => console.warn("Can't get location", error),
    // $FlowExpectedError
    constants.POSITION_OPTIONS,
  );

export const startGame = (): ThunkAction => async (dispatch, getState) => {
  const { position } = getState();
  const candy = await generateCandy(position);

  dispatch(initGame(position, candy));
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
};

export const requestCandy = (): ThunkAction => async (dispatch, getState) => {
  const { position } = getState();
  const candy = await generateCandy(position);

  dispatch(candyCreated(candy));
};
