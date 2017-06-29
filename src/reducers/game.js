// @flow
import GeoPoint from "geopoint";
import { random, some } from "lodash";
import * as constants from "../constants";
import type { Action, Game, Position } from "../types";

export const generateCandy = (position: Position): Position => {
  const point = new GeoPoint(position.latitude, position.longitude);
  const [minNE, minSW] = point.boundingCoordinates(
    constants.CANDY_MIN_DISTANCE,
    undefined,
    true,
  );
  const [maxNE, maxSW] = point.boundingCoordinates(
    constants.CANDY_MAX_DISTANCE,
    undefined,
    true,
  );

  switch (random(3)) {
    case 0:
      return {
        latitude: random(minNE.latitude(), maxNE.latitude()),
        longitude: random(minNE.longitude(), maxNE.longitude()),
      };
    case 1:
      return {
        latitude: random(minSW.latitude(), maxSW.latitude()),
        longitude: random(minNE.longitude(), maxNE.longitude()),
      };
    case 2:
      return {
        latitude: random(minNE.latitude(), maxNE.latitude()),
        longitude: random(minSW.longitude(), maxSW.longitude()),
      };
    case 3:
      return {
        latitude: random(minSW.latitude(), maxSW.latitude()),
        longitude: random(minSW.longitude(), maxSW.longitude()),
      };
  }
};

function* generatePositions(
  previous: Position[],
  current: Position,
  size: number,
): Iterable<Position> {
  if (previous.length && isTouched(current, previous[0])) {
    yield* previous;
    return;
  }

  yield current;

  let availableDistance = size * constants.SNAKE_PART_LENGTH;
  let pointBefore = new GeoPoint(current.latitude, current.longitude);

  for (const position of previous) {
    yield position;

    const point = new GeoPoint(position.latitude, position.longitude);
    availableDistance -= point.distanceTo(pointBefore, true);

    if (availableDistance < 0) {
      return;
    }

    pointBefore = point;
  }
}

const isTouched = (a: Position, b: Position, radius: number): boolean => {
  const aPoint = new GeoPoint(a.latitude, a.longitude);
  const bPoint = new GeoPoint(b.latitude, b.longitude);

  return aPoint.distanceTo(bPoint, true) <= radius;
};

const isSnakeTouchedHimself = (positions: Position[]): boolean =>
  some(positions.slice(2), position =>
    isTouched(positions[0], position, constants.SNAKE_TOUCH_RADIUS),
  );

const onPositionChanged = (game: Game, position: Position): Game => {
  const snakePosition = [
    ...generatePositions(game.snake.positions, position, game.snake.size),
  ];

  if (isSnakeTouchedHimself(snakePosition)) {
    return {
      ...game,
      status: constants.STATUS_OVER,
    };
  } else if (isTouched(position, game.candy, constants.CANDY_TOUCH_RADIUS)) {
    return {
      ...game,
      score: game.score + constants.CANDY_SCORE,
      candy: generateCandy(position),
      snake: {
        ...game.snake,
        positions: snakePosition,
        size: game.snake.size + 1,
      },
    };
  } else {
    return {
      ...game,
      score: game.score + constants.MOVE_SCORE,
      snake: {
        ...game.snake,
        positions: snakePosition,
      },
    };
  }
};

export default (state: ?Game = {}, action: Action): ?Game => {
  switch (action.type) {
    case constants.ACTION_INIT_GAME:
      return {
        snake: {
          size: 1,
          positions: [action.position],
        },
        candy: generateCandy(action.position),
        score: 0,
        status: constants.STATUS_IN_PROGRESS,
      };
    case constants.ACTION_POSITION_CHANGED:
      if (state.status === constants.STATUS_IN_PROGRESS) {
        return onPositionChanged(state, action.position);
      } else {
        return state;
      }
    case constants.ACTION_SKIPPED_CANDY:
      if (state.status === constants.STATUS_IN_PROGRESS) {
        return {
          ...state,
          candy: generateCandy(action.position),
          score: state.score - constants.SKIP_CANDY_PENALTY,
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};
