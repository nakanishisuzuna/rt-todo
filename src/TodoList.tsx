import React from 'react';
import { useRecoilState, atom } from 'recoil';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import { Todo, TodoFilter as TodoFilterType } from './types';
import { Container, List } from '@mui/material';

// Recoil State
const todoState = atom<Todo[]>({
  key: 'todoState',
  default: [],
});

const filterState = atom<TodoFilterType>({
  key: 'filterState',
  default: { id: '', status: '', deadline: '' },
});

const nextIdState = atom<number>({
  key: 'nextIdState',
  default: 1,
});

const TodoList: React.FC = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const [filter, setFilter] = useRecoilState(filterState);
  const [nextId, setNextId] = useRecoilState(nextIdState);

  const addTodo = (newTodo: Omit<Todo, 'id' | 'creationDate' | 'updateDate'>) => {
    const currentDate = new Date();
    setTodos([...todos, { ...newTodo, id: nextId, creationDate: currentDate, updateDate: currentDate }]);
    setNextId(nextId + 1);
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleStatusChange = (id: number, newStatus: '未着手' | '進行中' | '完了') => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, status: newStatus, updateDate: new Date() } : todo)));
  };

  const filteredTodos = todos.filter(todo => {
    const matchesId = filter.id === '' || todo.id.toString().includes(filter.id);
    const matchesStatus = filter.status === '' || todo.status === filter.status;
    const matchesDeadline = filter.deadline === '' || todo.deadline.includes(filter.deadline);
    return matchesId && matchesStatus && matchesDeadline;
  });

  return (
    <Container>
      <h1>TODO List</h1>
      <TodoForm onAdd={addTodo} />
      <TodoFilter filter={filter} onFilterChange={setFilter} />
      <List>
        {filteredTodos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={deleteTodo}
            onStatusChange={handleStatusChange}
          />
        ))}
      </List>
    </Container>
  );
};

export default TodoList;
