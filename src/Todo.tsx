import React from 'react';
import { RecoilRoot } from 'recoil';
import TodoList from './TodoList';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <TodoList />
    </RecoilRoot>
  );
};

export default App;
