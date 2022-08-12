import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';
import { Suspense } from 'react';

import { Todo } from '@/components';
import { LoginPage, RegisterPage, TodoPage, Auth } from './pages';
import Skeleton from './components/Skeleton/Skeleton';

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const App = () => {
  return (
    <BrowserRouter>
      <PageWrapper>
        <Routes>
          <Route path='/' element={<TodoPage />}>
            <Route
              path='/:todoId'
              element={
                <Suspense fallback={<Skeleton width={15} height={1.5} amount={2} />}>
                  <Todo.TodoDetail />
                </Suspense>
              }
            />
          </Route>
          <Route path='/auth' element={<Auth />}>
            <Route path='signin' element={<LoginPage />} />
            <Route path='signup' element={<RegisterPage />} />
          </Route>
          <Route path='*' element={<div>404 NOT FOUND!</div>} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
};

export default App;
