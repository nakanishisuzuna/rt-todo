import React from 'react';
import ReactDOM from 'react-dom';
import TodoList from './TodoList'; // TodoListコンポーネントをインポート

ReactDOM.render(
  <React.StrictMode>
    <TodoList />
  </React.StrictMode>,
  document.getElementById('root') // HTMLのroot要素にマウント
);
