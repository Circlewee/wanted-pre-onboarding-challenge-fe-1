import { useNavigate, Outlet } from 'react-router-dom';

import * as SC from './TodoPageStyle';
import { Todo } from '@/components';

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
      <Outlet />
    </div>
  );
};

export default TodoPage;
