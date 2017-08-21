// @flow
// $FlowExpectedError
import type { NavigationState } from "react-navigation/src/TypeDefinition";
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
  | typeof constants.STATUS_NOT_STARTED
  | typeof constants.STATUS_IN_PROGRESS
  | typeof constants.STATUS_OVER;

export type Game = {
  +snake: Snake,
  +candy: Position,
  +score: number,
  +status: GameStatus,
};

export type State = {
  +game: Game,
  +position: Position,
  +navigation: NavigationState,
};

export type PositionChangedAction = {
  +type: typeof constants.ACTION_POSITION_CHANGED,
  +position: Position,
};

export type InitGameAction = {
  +type: typeof constants.ACTION_INIT_GAME,
  +position: Position,
  +candy: Position,
};

export type CandyCreatedAction = {
  +type: typeof constants.ACTION_CANDY_CREATED,
  +candy: Position,
};

export type SnakeTouchedHimself = {
  +type: typeof constants.ACTION_SNAKE_TOUCHED_HIMSELF,
};

export type SnakeTouchedCandy = {
  +type: typeof constants.ACTION_SNAKE_TOUCHED_CANDY,
  +positions: Position[],
  +candy: Position,
};

export type SnakeMoved = {
  +type: typeof constants.ACTION_SNAKE_MOVED,
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
