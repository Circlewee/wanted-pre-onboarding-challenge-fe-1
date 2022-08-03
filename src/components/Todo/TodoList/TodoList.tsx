import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import * as SC from './TodoListStyle';
import { getTodoList, postTodo } from '@/lib/api';
import { IRequestError } from '@/types/types';
import { ITodo, ITodoListResponse, ITodoResponse } from '@/types/todoTypes';
import TodoSimple from '../TodoSimple/TodoSimple';

const TodoList = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITodo>({ mode: 'onChange' });

  const queryClient = useQueryClient();
  const { data } = useQuery(['todoList'], getTodoList);

  const { mutate } = useMutation<ITodoResponse, AxiosError<IRequestError>, ITodo>(postTodo, {
    onError(error, variables, context) {
      console.log(error);
    },
    onSuccess(_, variables) {
      /* setQueryData와 invalidateQueries는 같은 기능을 한다.
       * 다만 invalidateQueries는 적은 코드, 요청 1회 추가
       * setQueryData는 좀 더 많은 코드, 요청 없음, 응답으로 필드를 컨트롤 할 수 있음 이라는 차이점이 있다*/
      // queryClient.invalidateQueries(['todoList']);
      queryClient.setQueryData(
        ['todoList'],
        (old: ITodoListResponse | undefined): ITodoListResponse => {
          if (old) {
            return { data: [...old.data, variables] };
          }
          return { data: [variables] };
        }
      );
      reset({ title: '', content: '' });
    },
  });

  function postRequest(data: ITodo) {
    mutate(data);
  }

  return (
    <SC.Wrapper>
      {data?.data.map((todo) => {
        return <TodoSimple todo={todo} key={todo.id} />;
      })}
      <SC.TodoForm onSubmit={handleSubmit(postRequest)}>
        <SC.TodoInput
          id='todoTitle'
          type='text'
          placeholder='Title'
          {...register('title', { required: true })}
        />
        <SC.TodoInput
          id='todoContent'
          type='text'
          placeholder='Content'
          {...register('content', { required: true })}
        />
        <SC.PostButton type='submit'>추가</SC.PostButton>
      </SC.TodoForm>
    </SC.Wrapper>
  );
};

export default TodoList;
