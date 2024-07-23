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

  const handleInputChange = (field: keyof Omit<Todo, 'id'>) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewTodo({ ...newTodo, [field]: e.target.value });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="タイトル"
        value={newTodo.title}
        onChange={handleInputChange('title')}
      />
      <input
        type="text"
        placeholder="詳細"
        value={newTodo.detail}
        onChange={handleInputChange('detail')}
      />
      <select
        value={newTodo.status}
        onChange={handleInputChange('status')}
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
