import * as SC from './TodoPageStyle';
import { Todo } from '@/components';

const TodoPage = () => {
  return (
    <SC.Wrapper>
      <h1>TODO with React Query</h1>
      <Todo.TodoList />
    </SC.Wrapper>
  );
};

export default TodoPage;
