import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';

import * as SC from './TodoListStyle';
import { getTodoList, postTodo } from '@/lib/api';
import { IRequestError } from '@/types/types';
import { ITodo, ITodoListResponse, ITodoResponse } from '@/types/todoTypes';

const TodoList = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ITodo>({ mode: 'onChange' });

  const queryClient = useQueryClient();
  const { data } = useQuery(['todoList'], getTodoList);

  const todoMutation = useMutation<ITodoResponse, AxiosError<IRequestError>, ITodo>(postTodo, {
    onError(error, variables, context) {
      console.log(error);
    },
    onSuccess(todo, variables, context) {
      console.log(context);
      queryClient.setQueryData(
        ['todoList'],
        (old: ITodoListResponse | undefined): ITodoListResponse | undefined => {
          if (old) {
            return { data: [...old.data, variables] };
          }
        }
      );

      reset({ title: '', content: '' });
    },
  });

  function postRequest(data: ITodo) {
    todoMutation.mutate(data);
  }

  return (
    <SC.Wrapper>
      {data?.data.map((todo) => {
        return (
          <li key={todo.id}>
            {todo.title}: {todo.content}
          </li>
        );
      })}
      <form onSubmit={handleSubmit(postRequest)}>
        <SC.TodoInput
          id='todoTitle'
          type='text'
          placeholder='Title'
          {...register('title', { required: true })}
        />
        {errors.title && <p>{errors.title.type === 'required' && '필수 입력 항목입니다.'}</p>}
        <SC.TodoInput
          id='todoContent'
          type='text'
          placeholder='Content'
          {...register('content', { required: true })}
        />
        {errors.content && <p>{errors.content.type === 'required' && '필수 입력 항목입니다.'}</p>}
        <SC.PostButton type='submit'>추가</SC.PostButton>
      </form>
    </SC.Wrapper>
  );
};

export default TodoList;
