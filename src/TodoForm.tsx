import React, { useState } from 'react';
import { Todo } from './types';

interface TodoFormProps {
  onAdd: (todo: Omit<Todo, 'id'>) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>({ title: '', status: '未着手', detail: '' });

  const handleAddClick = () => {
    onAdd(newTodo);
    setNewTodo({ title: '', status: '未着手', detail: '' });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="タイトル"
        value={newTodo.title}
        onChange={e => setNewTodo({ ...newTodo, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="詳細"
        value={newTodo.detail}
        onChange={e => setNewTodo({ ...newTodo, detail: e.target.value })}
      />
      <select
        value={newTodo.status}
        onChange={e => setNewTodo({ ...newTodo, status: e.target.value as '未着手' | '進行中' | '完了' })}
      >
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <button onClick={handleAddClick}>追加</button>
    </div>
  );
};

export default TodoForm;
