import reducer from './reducers';

import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { BoardAction } from './actions';

const middlewares = process.env.REDUX_LOGGING ? [logger] : [];
export const createBoardStore = (initialData: State = new State()) => createStore<State, BoardAction, any, any>(reducer, initialData, applyMiddleware(...middlewares));

type PartiallyPartial<T, K extends keyof T> = Partial<T> & Required<Pick<T, K>>;
export type IndexedObj<T> = { [index: string]: T };

//////////////////
////// DATA //////
//////////////////

export type BoardId = string;
export type LaneId = string;
export type ItemId = string;

export class State {
  boards: { [index: string]: Board } = {};
}

export class Board {
  lanes: { [index: string]: Lane } = {};
  items: { [index: string]: Item } = {};

  laneOrder: LaneId[] = [];
}

export class Lane {
  title: string;
  items: ItemId[] = [];

  constructor({ title, items = [] }: PartiallyPartial<Lane, 'title'>) {
    this.title = title;
    this.items = items;
  }
}

export class Item {
  title: string;
  label: string;
  description: string;
  metadata: Object;

  constructor({
    title,
    label = "",
    description = "",
    metadata = {}
  }: PartiallyPartial<Item, 'title'>) {
    this.title = title;
    this.label = label;
    this.description = description;
    this.metadata = metadata;
  }
}
