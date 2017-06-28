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
  +candy: Position,
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
};

export type SkippedCandyAction = {
  +type: constants.ACTION_SKIPPED_CANDY,
  +position: Position,
};

export type Action =
  | PositionChangedAction
  | InitGameAction
  | SkippedCandyAction;

export type Dispatch = (action: Action | ThunkAction) => any;

export type GetState = () => State;

export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
