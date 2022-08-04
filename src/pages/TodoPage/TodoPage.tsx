import { Routes, Route, useNavigate } from 'react-router-dom';
import { Suspense } from 'react';

import * as SC from './TodoPageStyle';
import { Todo } from '@/components';
import Loading from '@/components/Loading/Loading';

const TodoPage = () => {
  const navigate = useNavigate();

  function goHome() {
    navigate('/');
  }

  return (
    <div>
      <h1>
        TODO with React Query <SC.HomeButton onClick={goHome}>🏠</SC.HomeButton>
      </h1>
      <Todo.TodoList />
      <Routes>
        <Route
          path=':todoId'
          element={
            <Suspense fallback={<Loading />}>
              <Todo.TodoDetail />
            </Suspense>
          }
        />
      </Routes>
    </div>
  );
};

export default TodoPage;
