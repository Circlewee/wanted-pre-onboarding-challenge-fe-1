import { useNavigate } from 'react-router-dom';
import * as SC from './TodoSimpleStyle';
import { TodoData } from '@/types/todoTypes';

interface Props {
  todo: TodoData;
  active: boolean;
  deleteRequest: (id: string) => void;
}

const TodoSimple = ({ todo, active, deleteRequest }: Props) => {
  const navigate = useNavigate();

  const handleDelete = () => {
    deleteRequest(todo.id);
  };

  const goDetail = () => {
    if (!active) {
      navigate(`/${todo.id}`);
    }
  };

  return (
    <SC.Wrapper>
      <SC.Todo onClick={goDetail} active={active}>
        {todo.title}: {todo.content}
      </SC.Todo>
      <button onClick={handleDelete}>❌</button>
    </SC.Wrapper>
  );
};

export default TodoSimple;
