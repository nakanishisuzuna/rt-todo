import React from 'react';

interface TodoFilterProps {
  filter: {
    id: string;
    status: '未着手' | '進行中' | '完了' | '';
    deadline: string;
  };
  onFilterChange: (filter: {
    id: string;
    status: '未着手' | '進行中' | '完了' | '';
    deadline: string;
  }) => void;
}

const TodoFilter: React.FC<TodoFilterProps> = ({ filter, onFilterChange }) => {
  return (
    <div>
      <h2>フィルター</h2>
      <input
        type="text"
        placeholder="IDで絞り込み"
        value={filter.id}
        onChange={e => onFilterChange({ ...filter, id: e.target.value })}
      />
      <select
        value={filter.status}
        onChange={e => onFilterChange({ ...filter, status: e.target.value as '未着手' | '進行中' | '完了' | '' })}
      >
        <option value="">全て</option>
        <option value="未着手">未着手</option>
        <option value="進行中">進行中</option>
        <option value="完了">完了</option>
      </select>
      <input
        type="text"
        placeholder="詳細で絞り込み"
        value={filter.deadline}
        onChange={e => onFilterChange({ ...filter, deadline: e.target.value })}
      />
    </div>
  );
};

export default TodoFilter;
