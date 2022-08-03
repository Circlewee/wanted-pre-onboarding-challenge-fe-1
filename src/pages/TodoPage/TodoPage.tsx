import { Routes, Route, useNavigate } from 'react-router-dom';

import * as SC from './TodoPageStyle';
import { Todo } from '@/components';

const TodoPage = () => {
  const navigate = useNavigate();

  function goHome() {
    navigate('/');
  }

  return (
    <SC.Wrapper>
      <h1>
        TODO with React Query <button onClick={goHome}>🏠</button>
      </h1>
      <Todo.TodoList />
      <Routes>
        <Route path=':todoId' element={<Todo.TodoDetail />} />
      </Routes>
    </SC.Wrapper>
  );
};

export default TodoPage;
