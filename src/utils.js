// @flow
import GeoPoint from "geopoint";
import { sample, random, some } from "lodash";
import type { Position } from "./types";
import * as constants from "./constants";
import * as config from "../config";

const generateCandyFromPlacesNearby = async (
  position: Position,
): Promise<?Position> => {
  const positionPoint = new GeoPoint(position.latitude, position.longitude);

  const response = await fetch(
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?" +
      `location=${position.latitude},${position.longitude}` +
      `radius=${config.CANDY_MAX_DISTANCE}`,
  );
  const { results } = await response.json();

  const availablePositions = results.filter(({ geometry }) => {
    const point = new GeoPoint(geometry.location.lat, geometry.location.lng);

    return positionPoint.distanceTo(point, true) > constants.CANDY_MIN_DISTANCE;
  });

  return sample(availablePositions);
};

const generateCandyFromRandom = (position: Position): Position => {
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
    default:
      return {
        latitude: random(minSW.latitude(), maxSW.latitude()),
        longitude: random(minSW.longitude(), maxSW.longitude()),
      };
  }
};

export const generateCandy = async (position: Position): Promise<Position> => {
  const candy = await generateCandyFromPlacesNearby(position);

  if (candy) {
    return candy;
  } else {
    return generateCandyFromRandom(position);
  }
};

export function* generatePositions(
  previous: Position[],
  current: Position,
  size: number,
): Iterable<Position> {
  if (
    previous.length &&
    isTouched(current, previous[0], constants.SNAKE_MIN_MOVE)
  ) {
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

export const isTouched = (
  a: Position,
  b: Position,
  radius: number,
): boolean => {
  const aPoint = new GeoPoint(a.latitude, a.longitude);
  const bPoint = new GeoPoint(b.latitude, b.longitude);

  return aPoint.distanceTo(bPoint, true) <= radius;
};

export const isSnakeTouchedHimself = (positions: Position[]): boolean =>
  some(positions.slice(2), position =>
    isTouched(positions[0], position, constants.SNAKE_TOUCH_RADIUS),
  );
