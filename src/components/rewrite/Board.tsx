import React, { Component } from "react";

import { DropResult } from "smooth-dnd";
import { Container } from "react-smooth-dnd";

import { Lane } from "./Lane";

import './Board.css'

import * as R from 'ramda'
import { applyDrag, columnNames, generateItems, lorem, pickColor, State } from "./utils";

import { connect } from "react-redux";
import { State as ReduxState, Board as BoardModel } from "../../store";
import { Dispatch } from "redux";
import { BoardAction } from "../../store/actions";

interface OwnProps {
  boardId: string;
}

class Board extends Component<OwnProps, State> {
  constructor(props) {
    super(props);

    this.state = {
      lanes: generateItems(4, i => ({
        id: `column${i}`,
        name: columnNames[i],
        cards: generateItems(+(Math.random() * 10).toFixed() + 5, j => ({
          id: `${i}${j}`,
          color: pickColor(),
          data: lorem.slice(0, Math.floor(Math.random() * 150) + 30)
        }))
      }))
    };
  }

  render() {
    return (
      <div className="card-scene">
        <Container
          orientation="horizontal"
          onDrop={this.onColumnDrop}
          dragHandleSelector=".column-drag-handle"

          onDragStart={e => console.log("LANE LANE drag started", e)}
          onDragEnd={e => console.log("LANE LANE drag end", e)}

          // @ts-ignore
          dropPlaceholder={{
            animationDuration: 150,
            showOnTop: true,
            className: 'cards-drop-preview'
          }}
        >
          {this.state.lanes.map(lane => <Lane lane={lane} onCardDrop={this.onCardDrop}
                                              getCardPayload={this.getCardPayload}/>)}
        </Container>
      </div>
    );
  }

  getCardPayload = (columnId, index) =>
    this.state.lanes.filter(p => p.id === columnId)[0].cards[index];

  onColumnDrop = dropResult => {
    this.setState({
      lanes: applyDrag(R.clone(this.state.lanes), dropResult)
    });
  };

  onCardDrop = (columnId: string, dropResult: DropResult) => {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const lanes = R.clone(this.state.lanes);
      const column = lanes.filter(p => p.id === columnId)[0];
      const columnIndex = lanes.indexOf(column);

      const newColumn = Object.assign({}, column);
      newColumn.cards = applyDrag(newColumn.cards, dropResult);
      lanes.splice(columnIndex, 1, newColumn);

      this.setState({
        lanes
      });
    }
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

connect(
  mapStateToProps,
  mapDispatchToProps,
)(Board);

export default Board;