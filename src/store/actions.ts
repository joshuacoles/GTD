// @flow
import { BoardId, ItemId, LaneId } from './index';
import { Board, Item, Lane } from './index';

interface Action<Type extends string, Payload> {
  type: Type,
  payload: Payload,
}

function createAction<Type extends string, Payload>(type: Type): (p: Payload) => Action<Type, Payload> {
  return function (payload: Payload) {
    return {
      type,
      payload,
    }
  }
}

// interface Action<Type extends string, Payload> extends ReduxAction<Type>, Omit<RAAction<Payload>, 'type'>{
//   type: Type,
//   payload: Payload,
// }

export type BoardAction =
  UpdateItemAction
  | UpdateLaneAction
  | DeleteItemAction
  | MoveLaneAction
  | MoveItemAction
  | AddItemAction
  | AddLaneAction
  | DeleteLaneAction
  | CreateBoardAction;

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////       Actions      ///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface BoardPayload {
  boardId: BoardId,
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface UpdateItemPayload extends BoardPayload {
  itemId: ItemId,
  update: Partial<Item>
}

export type UpdateItemAction = Action<'UPDATE_ITEM', UpdateItemPayload>;
export const updateItem = createAction<'UPDATE_ITEM', UpdateItemPayload>('UPDATE_ITEM');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface UpdateLanePayload extends BoardPayload {
  laneId: LaneId,
  update: Partial<Item>
}

export type UpdateLaneAction = Action<'UPDATE_LANE', UpdateLanePayload>;
export const updateLane = createAction<'UPDATE_LANE', UpdateLanePayload>('UPDATE_LANE');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface DeleteItemPayload extends BoardPayload {
  itemId: ItemId
}

export type DeleteItemAction = Action<'DELETE_ITEM', DeleteItemPayload>;
export const deleteItem: (payload: DeleteItemPayload) => DeleteItemAction = createAction<'DELETE_ITEM', DeleteItemPayload>('DELETE_ITEM');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface MoveLanePayload extends BoardPayload {
  laneId: LaneId,
  toIndex: number,
}

export type MoveLaneAction = Action<'MOVE_LANE', MoveLanePayload>;
export const moveLane = createAction<'MOVE_LANE', MoveLanePayload>('MOVE_LANE');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface MoveItemPayload extends BoardPayload {
  itemId: ItemId,

  toLane: LaneId | null,
  toPosition: number,
}

export type MoveItemAction = Action<'MOVE_ITEM', MoveItemPayload>;
export const moveItem = createAction<'MOVE_ITEM', MoveItemPayload>('MOVE_ITEM');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface AddItemPayload extends BoardPayload {
  itemId: ItemId,
  item: Item,

  laneId: LaneId,
  positionInLane: number | null
}

export type AddItemAction = Action<'ADD_ITEM', AddItemPayload>;
export const addItem = createAction<'ADD_ITEM', AddItemPayload>('ADD_ITEM');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface AddLanePayload extends BoardPayload {
  laneId: LaneId,
  lane: Lane
}

export type AddLaneAction = Action<'ADD_LANE', AddLanePayload>;
export const addLane = createAction<'ADD_LANE', AddLanePayload>('ADD_LANE');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface DeleteLanePayload extends BoardPayload {
  laneId: LaneId,
}

export type DeleteLaneAction = Action<'DELETE_LANE', DeleteLanePayload>;
export const deleteLane = createAction<'DELETE_LANE', DeleteLanePayload>('DELETE_LANE');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface CreateBoardPayload extends BoardPayload {
  initialBoard: Board
}

export type CreateBoardAction = Action<'CREATE_BOARD', CreateBoardPayload>;
export const createBoard = createAction<'CREATE_BOARD', CreateBoardPayload>('CREATE_BOARD');
