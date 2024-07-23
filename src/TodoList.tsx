import React, { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import { Todo, TodoFilter as TodoFilterType } from './types';

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilterType>({
    id: '',
    status: '',
    deadline: ''
  });
  const [nextId, setNextId] = useState<number>(1);

  const addTodo = (newTodo: Omit<Todo, 'id'>) => {
    setTodos(prevTodos => [...prevTodos, { ...newTodo, id: nextId }]);
    setNextId(prevId => prevId + 1);
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: '未着手' | '進行中' | '完了') => {
    setTodos(prevTodos =>
      prevTodos.map(todo => (todo.id === id ? { ...todo, status: newStatus } : todo))
    );
  };

  const filteredTodos = todos.filter(todo => {
    const matchesId = filter.id === '' || todo.id.toString().includes(filter.id);
    const matchesStatus = filter.status === '' || todo.status === filter.status;
    const matchesDeadline = filter.deadline === '' || todo.detail.includes(filter.deadline);
    return matchesId && matchesStatus && matchesDeadline;
  });

  return (
    <div>
      <h1>TODO List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <ul>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onStatusChange={handleStatusChange}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
