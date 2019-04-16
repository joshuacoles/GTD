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
import { NewLaneButton } from "../../../styles/Elements";
import { LaneSection } from "../../../styles/Base";
import NewLane from "../../lanes/NewLane";

interface OwnProps {
  boardId: string;
}

class Board extends Component<OwnProps & StoreProps, { currentlyAddingLanes: boolean }> {
  constructor(props) {
    super(props);
    this.state = { currentlyAddingLanes: false };
  }

  setCurrentlyAddingLanes = (b: boolean) => this.setState({ currentlyAddingLanes: b });

  render() {
    // TODO: Permissions
    const canAddLanes = true;
    const { currentlyAddingLanes } = this.state;

    return (
      <MaterialBoard>
        <PopoverWrapper>
          <Container
            orientation="horizontal"
            dragHandleSelector=".column-drag-handle"

            onDrop={this.onColumnDrop}

            // @ts-ignore
            dropPlaceholder={{
              animationDuration: 150,
              showOnTop: true,
              className: 'cards-drop-preview'
            }}
          >
            {Object.entries(this.props.board.lanes).map(([laneId, lane]: [string, LaneModel]) =>
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

        {canAddLanes && <Container orientation="horizontal">
          {currentlyAddingLanes ? (
            <NewLane onCancel={() => this.setCurrentlyAddingLanes(false)} onAdd={this.addLane}/>
          ) : (
            <LaneSection style={{ width: 200 }}>
              <NewLaneButton onClick={() => this.setCurrentlyAddingLanes(true)}>+ Add another lane</NewLaneButton>
            </LaneSection>
          )}
        </Container>}
      </MaterialBoard>
    );
  }

  private addLane = (lane: LaneModel) => {
    if (lane.title === undefined) return;

    this.props.dispatch(addLane({
      // @ts-ignore
      boardId: this.props.boardId, lane: lane, laneId: uuid()
    }));

    this.setCurrentlyAddingLanes(false);
  };

  private removeCard = (cardId: ItemId) => this.props.dispatch(deleteItem({
    boardId: this.props.boardId,
    itemId: cardId,
  }));

  onColumnDrop = (dropResult: DropResult) => {
    if (dropResult.removedIndex === null || dropResult.addedIndex === null) return;

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
