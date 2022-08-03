import { useNavigate } from 'react-router-dom';

import * as SC from './TodoSimpleStyle';
import { ITodo } from '@/types/todoTypes';

interface ITodoSimpleProps {
  todo: ITodo;
  deleteRequest: (id: string) => void;
}

const TodoSimple = ({ todo, deleteRequest }: ITodoSimpleProps) => {
  const navigate = useNavigate();

  function handleDelete() {
    deleteRequest(todo.id);
  }

  function goDetail() {
    navigate(`/${todo.id}`);
  }

  return (
    <SC.Wrapper>
      <SC.Todo onClick={goDetail}>
        {todo.title}: {todo.content}
      </SC.Todo>
      <button>📝</button>
      <button onClick={handleDelete}>❌</button>
    </SC.Wrapper>
  );
};

export default TodoSimple;
