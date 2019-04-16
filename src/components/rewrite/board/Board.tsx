import React, { Component, useState } from "react";

import { DropResult } from "smooth-dnd";
import { Container } from "react-smooth-dnd";

import { Lane } from "../lane/Lane";

import MaterialBoard from './MaterialBoard'

import { connect } from "react-redux";
import { State as ReduxState, Board as BoardModel, Lane as LaneModel, ItemId, Item, LaneId } from "../../../store";
import { Dispatch } from "redux";
import { BoardAction, deleteItem, moveItem, moveLane, addItem, addLane, deleteLane } from "../../../store/actions";
import uuid from "uuid";

import { PopoverWrapper } from '@terebentina/react-popover';
import TrelloBoard from "./TrelloBoard";

interface OwnProps {
  boardId: string;
}

class Board extends Component<OwnProps & StoreProps, { currentlyAddingLanes: boolean }> {
  constructor(props) {
    super(props);
    this.state = { currentlyAddingLanes: false };
  }

  render() {
    // TODO: Permissions
    const canAddLanes = true;

    const lanes: [LaneId, LaneModel][] = this.props.board.laneOrder.map(laneId => [laneId, this.props.board.lanes[laneId]]);

    return (
      <MaterialBoard canAddLanes={canAddLanes} addLane={this.addLane}>
        <PopoverWrapper>
          <Container
            orientation="horizontal"
            dragHandleSelector=".column-drag-handle"

            onDrop={this.onLaneDrop}

            // @ts-ignore
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'cards-drop-preview'
            }}
          >
            {lanes.map(([laneId, lane]: [LaneId, LaneModel]) =>
              <Lane
                key={laneId}
                laneId={laneId}

                lane={lane}
                onCardDrop={this.onCardDrop}
                getCard={this.getCard}
                removeCard={this.removeCard}
                addCard={this.addCard}
                removeLane={this.removeLane}

                // TODO: Permissions context data
                canAddCards={true}
                canAddLanes={true}
                canRemoveLanes={true}
              />)
            }
          </Container>
        </PopoverWrapper>
      </MaterialBoard>
    );
  }

  private addLane = (lane: LaneModel): boolean => {
    if (lane.title === undefined) return false;

    this.props.dispatch(addLane({
      // @ts-ignore
      boardId: this.props.boardId, lane: lane, laneId: uuid()
    }));

    return true;
  };

  private removeCard = (cardId: ItemId) => this.props.dispatch(deleteItem({
    boardId: this.props.boardId,
    itemId: cardId,
  }));

  onLaneDrop = (dropResult: DropResult) => {
    if (dropResult.removedIndex === null || dropResult.addedIndex === null) return;
    if (dropResult.removedIndex === dropResult.addedIndex) return; // Didn't move

    this.props.dispatch(moveLane({
      boardId: this.props.boardId,
      laneId: this.props.board.laneOrder[dropResult.removedIndex],
      toIndex: dropResult.addedIndex,
    }));
  };

  onCardDrop = (laneId: LaneId, dropResult: DropResult) => {
    const { removedIndex, addedIndex, payload } = dropResult;
    const itemId = payload as ItemId;

    // Something went wrong
    if (removedIndex === null && addedIndex === null) return;

    // Didn't move, note when moving between one of these is null so even if we move lanes at same position it doesn't
    // matter
    if (dropResult.removedIndex === dropResult.addedIndex) return; // Didn't move

    // An item was removed from this lane into another
    if (addedIndex === null) return;

    // An item was added from a different lane
    if (removedIndex === null) {
      this.props.dispatch(moveItem({
        boardId: this.props.boardId,
        itemId,

        toLane: laneId,
        toPosition: addedIndex,
      }));
    } else {
      // Move within lane
      this.props.dispatch(moveItem({
        boardId: this.props.boardId,
        itemId,

        toLane: null,
        toPosition: addedIndex
      }));
    }

    return;
  };

  private getCard = (cardId: ItemId): Item => this.props.board.items[cardId];

  private addCard = (laneId: LaneId, card: Item) => {
    this.props.dispatch(addItem({
      boardId: this.props.boardId,
      item: card,
      itemId: uuid(),
      laneId,
      positionInLane: null,
    }))
  };

  private removeLane = (laneId: LaneId) => {
    this.props.dispatch(deleteLane({
      boardId: this.props.boardId,
      laneId,
    }))
  };
}

interface StoreProps {
  board: BoardModel;
  dispatch: Dispatch<BoardAction>;
}

function mapStateToProps(state: ReduxState, ownProps: OwnProps) {
  return { board: state.boards[ownProps.boardId] };
}

function mapDispatchToProps(dispatch) {
  return { dispatch };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);
