// @flow
import * as constants from "../constants";
import type { Action, Game } from "../types";

export default (state: Game, action: Action): ?Game => {
  switch (action.type) {
    case constants.ACTION_INIT_GAME:
      return {
        snake: {
          size: 1,
          positions: [action.position],
        },
        candy: action.candy,
        score: 0,
        status: constants.STATUS_IN_PROGRESS,
      };
    case constants.ACTION_SNAKE_TOUCHED_HIMSELF:
      return {
        ...state,
        status: constants.STATUS_OVER,
      };
    case constants.ACTION_SNAKE_TOUCHED_CANDY:
      return {
        ...state,
        score: state.score + constants.CANDY_SCORE,
        candy: action.candy,
        snake: {
          ...state.snake,
          positions: action.positions,
          size: state.snake.size + 1,
        },
      };
    case constants.ACTION_SNAKE_MOVED:
      return {
        ...state,
        score: state.score + constants.MOVE_SCORE,
        snake: {
          ...state.snake,
          positions: action.positions,
        },
      };
    case constants.ACTION_CANDY_CREATED:
      if (state.status === constants.STATUS_IN_PROGRESS) {
        return {
          ...state,
          candy: action.candy,
          score: state.score - constants.SKIP_CANDY_PENALTY,
        };
      } else {
        return state;
      }
    default:
      return state || null;
  }
};
