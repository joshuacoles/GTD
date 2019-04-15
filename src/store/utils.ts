import * as R from 'ramda';
import { BoardId, ItemId, LaneId, State } from './index';

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