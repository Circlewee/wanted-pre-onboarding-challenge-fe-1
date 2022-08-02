import { useQuery, QueryClient } from '@tanstack/react-query';

import * as SC from './TodoListStyle';
import { getTodoList } from '@/lib/api';

const TodoList = () => {
  const queryClient = new QueryClient();
  const { data } = useQuery(['todoList'], getTodoList);

  return (
    <SC.Wrapper>
      {data?.data.map((todo) => {
        return <li key={todo.id}>{todo.content}</li>;
      })}
    </SC.Wrapper>
  );
};

export default TodoList;
