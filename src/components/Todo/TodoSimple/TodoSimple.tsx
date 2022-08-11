import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import * as SC from './TodoSimpleStyle';
import { TodoData } from '@/types/todoTypes';

interface Props {
  todo: TodoData;
  active: boolean;
  deleteRequest: (id: string) => void;
}

const TodoSimple = ({ todo, active, deleteRequest }: Props) => {
  const navigate = useNavigate();
  const [isDone, setIsDone] = useState(false);

  function handleDelete() {
    deleteRequest(todo.id);
  }

  function goDetail() {
    if (!active) {
      navigate(`/${todo.id}`);
    }
  }

  function handleChange() {
    setIsDone((prev) => !prev);
  }

  return (
    <SC.Wrapper>
      <input type='checkbox' onChange={handleChange} />
      <SC.Todo onClick={goDetail} active={active} isDone={isDone}>
        {todo.title}: {todo.content}
      </SC.Todo>
      <button onClick={handleDelete}>❌</button>
    </SC.Wrapper>
  );
};

export default TodoSimple;
