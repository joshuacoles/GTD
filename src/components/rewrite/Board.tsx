import React, { Component } from "react";

import { DropResult } from "smooth-dnd";
import { Container } from "react-smooth-dnd";

import { Lane } from "./Lane";

import './Board.css'

import { connect } from "react-redux";
import { State as ReduxState, Board as BoardModel, Lane as LaneModel, ItemId, Item, LaneId } from "../../store";
import { Dispatch } from "redux";
import { BoardAction, deleteItem, moveItem, moveLane } from "../../store/actions";

interface OwnProps {
  boardId: string;
}

class Board extends Component<OwnProps & StoreProps, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="card-scene">
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
            />)
          }
        </Container>
      </div>
    );
  }

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
