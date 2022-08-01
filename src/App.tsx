import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<div>App</div>} />
        <Route path='/auth' element={<div>Login</div>} />
        <Route path='/register' element={<div>Register</div>} />
        <Route path='*' element={<div>404 NOT FOUND!</div>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
