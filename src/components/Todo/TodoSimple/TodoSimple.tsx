import { useNavigate } from 'react-router-dom';

import * as SC from './TodoSimpleStyle';
import { ITodo } from '@/types/todoTypes';

interface ITodoSimpleProps {
  todo: ITodo;
  active: boolean;
  deleteRequest: (id: string) => void;
}

const TodoSimple = ({ todo, active, deleteRequest }: ITodoSimpleProps) => {
  const navigate = useNavigate();

  function handleDelete() {
    deleteRequest(todo.id);
  }

  function goDetail() {
    if (!active) {
      navigate(`/${todo.id}`);
    }
  }

  return (
    <SC.Wrapper>
      <SC.Todo onClick={goDetail} active={active}>
        {todo.title}: {todo.content}
      </SC.Todo>
      <button>📝</button>
      <button onClick={handleDelete}>❌</button>
    </SC.Wrapper>
  );
};

export default TodoSimple;
