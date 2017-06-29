// @flow

export const ACTION_POSITION_CHANGED = "ACTION_POSITION_CHANGED";

export const ACTION_INIT_GAME = "ACTION_INIT_GAME";

export const ACTION_SKIPPED_CANDY = "ACTION_SKIPPED_CANDY";

export const STATUS_NOT_STARTED = "STATUS_NOT_STARTED";

export const STATUS_IN_PROGRESS = "STATUS_IN_PROGRESS";

export const STATUS_OVER = "STATUS_OVER";

export const ROUTE_START_MENU = "ROUTE_START_MENU";

export const ROUTE_GAME = "ROUTE_GAME";

export const POSITION_OPTIONS = {
  enableHighAccuracy: true,
  distanceFilter: 0.01,
};

export const SNAKE_PART_LENGTH = 0.05;

export const CANDY_TOUCH_RADIUS = 0.015;

export const SNAKE_TOUCH_RADIUS = 0.005;

export const SNAKE_MIN_MOVE = 0.005;

export const CANDY_MIN_DISTANCE = 0.02;

export const CANDY_MAX_DISTANCE = 0.1;

export const MOVE_SCORE = 1;

export const CANDY_SCORE = 100;

export const SKIP_CANDY_PENALTY = 10;
