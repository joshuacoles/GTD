import * as R from 'ramda';
import uuid from "uuid";

import { Item, BoardId, ItemId, LaneId, State } from './index';

export function laneOf(state: State, boardId: BoardId, itemId: ItemId): [LaneId, number] {
  for (const laneId of Object.keys(state.boards[boardId].lanes)) {
    const index = R.indexOf(itemId, state.boards[boardId].lanes[laneId].items);

    if (index !== -1) return [laneId, index];
  }

  throw 'known';
}

export const arrayMove = R.curry((old_index: number, new_index: number, arr: any[]) => {
  arr = R.clone(arr);

  while (old_index < 0) old_index += arr.length;
  while (new_index < 0) new_index += arr.length;

  if (new_index >= arr.length) {
    let k = new_index - arr.length + 1;

    while (k--) {
      arr.push(undefined);
    }
  }

  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr; // for testing purposes
});

export const lorem = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

export const columnNames = ["Lorem", "Ipsum", "Consectetur", "Eiusmod"];

const cardColors = [
  "azure",
  "beige",
  "bisque",
  "blanchedalmond",
  "burlywood",
  "cornsilk",
  "gainsboro",
  "ghostwhite",
  "ivory",
  "khaki"
];

export const pickColor = () => {
  let rand = Math.floor(Math.random() * 10);
  return cardColors[rand];
};

export function generateItems<I>(count: number, creator: (n: number) => I): I[] {
  const result: I[] = [];

  for (let i = 0; i < count; i++) {
    result.push(creator(i));
  }

  return result;
}

export function generateState(): State {
  const items: (Item & { id: string })[] = generateItems(30, j => ({
    id: uuid(),
    title: 'Item',
    label: 'test',
    metadata: { color: pickColor() },
    description: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
  }));

  const itemIds = R.map(R.prop('id'), items);

  const splitItems = R.splitEvery(5, itemIds);
  const laneIds = R.times((_) => uuid(), splitItems.length);

  return {
    boards: {
      'board1': {
        items: R.zipObj(itemIds, items),
        lanes: R.zipObj(laneIds, splitItems.map((items, i) => ({
          id: laneIds[i],
          title: columnNames[i % 4],
          label: 'test',
          items: items,
        }))),

        laneOrder: laneIds,
      }
    },
  };
}
