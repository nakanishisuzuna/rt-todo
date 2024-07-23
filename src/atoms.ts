import { atom } from 'recoil';
import { Todo, TodoFilter } from './types';

export const todoListState = atom<Todo[]>({
  key: 'todoListState',
  default: [],
});

export const todoFilterState = atom<TodoFilter>({
  key: 'todoFilterState',
  default: {
    id: '',
    status: '',
    deadline: '',
  },
});
