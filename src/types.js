// @flow
import * as constants from "./constants";

export type Position = {
  +longitude: number,
  +latitude: number,
};

export type Snake = {
  +size: number,
  +positions: Position[],
};

export type GameStatus =
  | constants.STATUS_NOT_STARTED
  | constants.STATUS_IN_PROGRESS
  | constants.STATUS_OVER;

export type Game = {
  +snake: Snake,
  +candy: ?Position,
  +score: number,
  +status: GameStatus,
};

export type State = {
  +game: ?Game,
  +position: ?Position,
};

export type PositionChangedAction = {
  +type: constants.ACTION_POSITION_CHANGED,
  +position: Position,
};

export type InitGameAction = {
  +type: constants.ACTION_INIT_GAME,
  +position: Position,
  +candy: Position,
};

export type CandyCreatedAction = {
  +type: constants.ACTION_CANDY_CREATED,
  +candy: Position,
};

export type SnakeTouchedHimself = {
  +type: constants.ACTION_SNAKE_TOUCHED_HIMSELF,
};

export type SnakeTouchedCandy = {
  +type: constants.ACTION_SNAKE_TOUCHED_CANDY,
  +positions: Position[],
  +candy: Position,
};

export type SnakeMoved = {
  +type: constants.ACTION_SNAKE_MOVED,
  +positions: Position[],
};

export type Action =
  | PositionChangedAction
  | InitGameAction
  | CandyCreatedAction
  | SnakeTouchedHimself
  | SnakeTouchedCandy;

export type Dispatch = (action: Action | ThunkAction) => any;

export type GetState = () => State;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
