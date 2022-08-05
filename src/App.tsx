import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.min.css';
import styled from 'styled-components';

import { LoginPage, RegisterPage, TodoPage } from './pages';

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
          <Route path='/*' element={<TodoPage />} />
          <Route path='/auth' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<div>404 NOT FOUND!</div>} />
        </Routes>
      </PageWrapper>
    </BrowserRouter>
  );
};

export default App;
