import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/rewrite/Board';
import { Provider } from "react-redux";
import { createBoardStore } from "./store";

ReactDOM.render(
  <Provider store={createBoardStore()}>
    <App boardId={"board1"}/>
  </Provider>,

  document.getElementById('root')
);
