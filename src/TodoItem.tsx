import React from 'react';
import { Todo } from './types';

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onStatusChange: (id: number, status: '未着手' | '進行中' | '完了') => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onStatusChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(todo.id, e.target.value as '未着手' | '進行中' | '完了');
  };

  return (
    <li>
      <span>ID: {todo.id} - </span>
      <span>タイトル: {todo.title} - </span>
      <span>詳細: {todo.detail} - </span>
      <span>ステータス: {todo.status}</span>
      <select value={todo.status} onChange={handleStatusChange}>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <button onClick={() => onDelete(todo.id)}>削除</button>
    </li>
  );
};

export default TodoItem;
