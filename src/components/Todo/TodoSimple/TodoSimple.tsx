import * as SC from './TodoSimpleStyle';
import { ITodo } from '@/types/todoTypes';

interface ITodoSimpleProps {
  todo: ITodo;
  deleteRequest: (id: string) => void;
}

const TodoSimple = ({ todo, deleteRequest }: ITodoSimpleProps) => {
  function handleDelete() {
    deleteRequest(todo.id);
  }

  return (
    <SC.Wrapper>
      {todo.title}: {todo.content} <button>📝</button>
      <button onClick={handleDelete}>❌</button>
    </SC.Wrapper>
  );
};

export default TodoSimple;
