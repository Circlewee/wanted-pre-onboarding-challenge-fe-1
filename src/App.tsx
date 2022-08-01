import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { LoginPage, RegisterPage } from './pages';

const style = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const App = () => {
  return (
    <BrowserRouter>
      <div style={style}>
        <Routes>
          <Route path='/' element={<div>App</div>} />
          <Route path='/auth' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='*' element={<div>404 NOT FOUND!</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
