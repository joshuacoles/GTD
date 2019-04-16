// @flow
import * as R from 'ramda';

import {
  AddItemAction,
  AddLaneAction,
  BoardAction,
  CreateBoardAction,
  DeleteItemAction,
  MoveItemAction,
  MoveLaneAction,
  UpdateItemAction,
  UpdateLaneAction
} from './actions';

import { arrayMove, laneOf } from './utils';
import { Board, BoardId, IndexedObj, Item, ItemId, Lane, LaneId, State } from './index';

function merge<T>(partial: Partial<T>): (t: T) => T {
  return (t: T) => R.mergeLeft(partial, t) as T
}

export function updateItem(state: State, {
  payload: {
    boardId,
    itemId,
    update
  }
}: UpdateItemAction): State {
  return R.evolve({
    boards: {
      [boardId]: {
        items: {
          [itemId]: merge<Item>(update)
        }
      }
    }
  }, state);
}

export function updateLane(state: State, {
  payload: {
    boardId,
    laneId,
    update
  }
}: UpdateLaneAction): State {
  return R.evolve({
    boards: {
      [boardId]: {
        lanes: {
          [laneId]: merge<Lane>(update)
        }
      }
    }
  }, state);
}

// NOTE: At the moment we are not accounting for the concept of unlisted
export function deleteItem(state: State, { payload: { boardId, itemId } }: DeleteItemAction): State {
  const [laneId, index] = laneOf(state, boardId, itemId);

  return R.evolve({
    boards: {
      [boardId]: {
        items: R.omit<ItemId>([itemId]),
        lanes: {
          [laneId]: {
            items: R.remove(index, 1)
          }
        }
      }
    }
  }, state);
}

export function moveLane(state: State, { payload: { boardId, laneId, toIndex } }: MoveLaneAction): State {
  const laneIndex = state.boards[boardId].laneOrder.indexOf(laneId);
  if (laneIndex === -1) throw 'Lane not in board';

  return R.evolve({
    boards: {
      [boardId]: {
        laneOrder: arrayMove(laneIndex, toIndex)
      }
    }
  }, state);
}

export function moveItem(state: State, {
  payload: {
    boardId,
    itemId,

    toLane = null,
    toPosition
  }
}: MoveItemAction): State {
  const [currentLane, currentPosition] = laneOf(state, boardId, itemId);
  if (currentLane === undefined || currentPosition === undefined) throw 'Item not in board';
  if (toLane === null && currentPosition === toPosition) return state;

  if (toLane === null) {
    return R.evolve({
      boards: {
        [boardId]: {
          lanes: {
            [currentLane]: {
              items: arrayMove(currentPosition, toPosition)
            }
          }
        }
      }
    }, state);
  } else {
    return R.evolve({
      boards: {
        [boardId]: {
          lanes: {
            [currentLane]: {
              items: R.remove<ItemId>(currentPosition, 1)
            },

            [toLane]: {
              items: R.insert(toPosition, itemId)
            }
          }
        }
      }
    }, state);
  }
}

// What should happen to those items in lane?
export function deleteLane(state: State, { payload: { boardId, laneId } }: AddLaneAction): State {
  return R.evolve({
    boards: {
      [boardId]: {
        lanes: R.omit([laneId]),
        laneOrder: R.without<LaneId>([laneId])
      }
    }
  }, state);
}

export function addItem(state: State, {
  payload: {
    boardId,

    itemId,
    item,

    laneId,
    positionInLane
  }
}: AddItemAction): State {
  return R.evolve({
    boards: {
      [boardId]: {
        lanes: {
          [laneId]: {
            // NOTE: This handles -'ve positions
            items: R.insert<ItemId>(positionInLane === null ? -1 : positionInLane, itemId)
          }
        },

        items: R.assoc(itemId, item)
      }
    }
  }, state);
}

export function addLane(state: State, {
  payload: {
    boardId,
    laneId,
    lane
  }
}: AddLaneAction): State {
  return R.evolve({
    boards: {
      [boardId]: {
        lanes: R.assoc<Lane, LaneId>(laneId, lane),
        laneOrder: R.append(laneId),
      }
    }
  }, state);
}

export function createBoard(state: State, {
  payload: {
    boardId,
    initialBoard
  }
}: CreateBoardAction): State {
  let board: Board = Object.assign({}, new Board(), initialBoard);

  let boards: (boards: IndexedObj<Board>) => IndexedObj<Board> = R.assoc<Board, BoardId>(boardId, board);

  return R.evolve({
    boards
  }, state);
}

export default (state: State = new State(), action: BoardAction) => {
  if (action.type === 'UPDATE_ITEM') {
    return updateItem(state, action);
  } else if (action.type === 'UPDATE_LANE') {
    return updateLane(state, action);
  } else if (action.type === 'DELETE_ITEM') {
    return deleteItem(state, action);
  } else if (action.type === 'MOVE_LANE') {
    return moveLane(state, action);
  } else if (action.type === 'MOVE_ITEM') {
    return moveItem(state, action);
  } else if (action.type === 'ADD_ITEM') {
    return addItem(state, action);
  } else if (action.type === 'ADD_LANE') {
    return addLane(state, action);
  } else if (action.type === 'CREATE_BOARD') {
    return createBoard(state, action);
  } else {
    return state;
  }
}