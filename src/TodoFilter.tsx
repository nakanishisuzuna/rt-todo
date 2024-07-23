import React from 'react';
import { TodoFilter as TodoFilterType } from './types';

interface TodoFilterProps {
  filter: TodoFilterType;
  onFilterChange: (filter: TodoFilterType) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div>
      <h2>フィルター</h2>
      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          placeholder="IDで絞り込み"
          value={filter.id}
          onChange={e => onFilterChange({ ...filter, id: e.target.value })}
          style={{ marginRight: '8px' }}
        />
        <select
          value={filter.status}
          onChange={e => onFilterChange({ ...filter, status: e.target.value as '未着手' | '進行中' | '完了' | '' })}
          style={{ marginRight: '8px' }}
        >
          <option value="">全て</option>
          <option value="未着手">未着手</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
        </select>
        <input
          type="text"
          placeholder="期限で絞り込み"
          value={filter.deadline}
          onChange={e => onFilterChange({ ...filter, deadline: e.target.value })}
        />
      </div>
    </div>
  );
};

export default TodoFilter;
