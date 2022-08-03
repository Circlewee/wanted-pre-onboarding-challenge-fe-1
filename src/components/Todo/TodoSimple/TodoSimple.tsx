import { useMutation, useQueryClient } from '@tanstack/react-query';

import * as SC from './TodoSimpleStyle';
import { ITodo } from '@/types/todoTypes';
import { deleteTodo } from '@/lib/api';

interface ITodoSimpleProps {
  todo: ITodo;
}

const TodoSimple = ({ todo }: ITodoSimpleProps) => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(deleteTodo, {
    onSuccess() {
      queryClient.invalidateQueries(['todoList']);
    },
  });

  function deleteRequest() {
    mutate(todo.id);
  }

  return (
    <SC.Wrapper>
      {todo.title}: {todo.content} <button onClick={deleteRequest}>❌</button>
    </SC.Wrapper>
  );
};

export default TodoSimple;
