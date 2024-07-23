import React, { useState } from 'react';

// TODO項目の型定義
interface Todo {
  id: number;
  title: string;
  status: '未着手' | '進行中' | '完了';
  detail: string;
}

// フィルターの型定義
interface Filter {
  id: string;
  status: '未着手' | '進行中' | '完了' | '';
  deadline: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>({ id: '', status: '', deadline: '' });
  const [newTodo, setNewTodo] = useState<Omit<Todo, 'id'>>({ title: '', status: '未着手', detail: '' });
  const [nextId, setNextId] = useState<number>(1); // 初期値を1に設定

  const addTodo = () => {
    const todoWithId: Todo = { ...newTodo, id: nextId };
    setTodos([...todos, todoWithId]);
    setNewTodo({ title: '', status: '未着手', detail: '' });
    setNextId(nextId + 1); // 次のIDをインクリメント
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id: number, updatedTodo: Partial<Omit<Todo, 'id'>>) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
  };

  const handleStatusChange = (id: number, newStatus: '未着手' | '進行中' | '完了') => {
    editTodo(id, { status: newStatus });
  };

  const filteredTodos = todos.filter(todo => {
    return (
      (filter.id === '' || todo.id.toString().includes(filter.id)) &&
      (filter.status === '' || todo.status === filter.status) &&
      (filter.deadline === '' || todo.detail.includes(filter.deadline))
    );
  });

  return (
    <div>
      <h1>TODO List</h1>
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
        <button onClick={addTodo}>追加</button>
      </div>
      <div>
        <h2>フィルター</h2>
        <input
          type="text"
          placeholder="IDで絞り込み"
          value={filter.id}
          onChange={e => setFilter({ ...filter, id: e.target.value })}
        />
        <select
          value={filter.status}
          onChange={e => setFilter({ ...filter, status: e.target.value as '未着手' | '進行中' | '完了' | '' })}
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
          onChange={e => setFilter({ ...filter, deadline: e.target.value })}
        />
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <span>ID: {todo.id} - </span>
            <span>タイトル: {todo.title} - </span>
            <span>詳細: {todo.detail} - </span>
            <span>ステータス: {todo.status}</span>
            <select
              value={todo.status}
              onChange={e => handleStatusChange(todo.id, e.target.value as '未着手' | '進行中' | '完了')}
            >
              <option value="未着手">未着手</option>
              <option value="進行中">進行中</option>
              <option value="完了">完了</option>
            </select>
            <button onClick={() => deleteTodo(todo.id)}>削除</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
