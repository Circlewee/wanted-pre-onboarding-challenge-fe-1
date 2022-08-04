import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import * as SC from './TodoListStyle';
import { getTodoList, postTodo, deleteTodo } from '@/lib/api';
import { IRequestError } from '@/types/types';
import { IFormType, ITodoResponse } from '@/types/todoTypes';
import TodoSimple from '../TodoSimple/TodoSimple';
import TodoForm from '../TodoForm/TodoForm';

const TodoList = () => {
  const navigate = useNavigate();
  const params = useParams();

  // const queryClient = useQueryClient();
  const { data, refetch } = useQuery(['todoList'], getTodoList, {
    staleTime: 5000,
    suspense: true,
  });

  const postMutation = useMutation<ITodoResponse, AxiosError<IRequestError>, IFormType>(postTodo, {
    onError(error) {
      alert(error);
    },
    onSuccess(response) {
      /* setQueryData와 invalidateQueries는 같은 기능을 한다.
       * 다만 invalidateQueries는 적은 코드, 요청 1회 추가
       * setQueryData는 좀 더 많은 코드, 요청 없음, 응답으로 필드를 컨트롤 할 수 있음 이라는 차이점이 있다.
       * 혹은 refetch()도 존재한다. */
      // queryClient.invalidateQueries(['todoList']);
      // queryClient.setQueryData(
      //   ['todoList'],
      //   (old: ITodoListResponse | undefined): ITodoListResponse => {
      //     if (old) {
      //       return { data: [...old.data, response.data] };
      //     }
      //     return { data: [response.data] };
      //   }
      // );
      refetch();
      navigate(`/${response.data.id}`);
    },
  });

  const deleteMutation = useMutation(deleteTodo, {
    onSuccess(data) {
      refetch();
      if (data === params['*']) navigate('/');
    },
  });

  function postRequest(data: IFormType) {
    postMutation.mutate(data);
  }

  function deleteRequest(id: string) {
    deleteMutation.mutate(id);
  }

  return (
    <SC.Wrapper>
      <div>
        <h2>TODO List</h2>
        {data?.data.map((todo) => {
          return (
            <TodoSimple
              key={todo.id}
              todo={todo}
              active={params['*'] === todo.id}
              deleteRequest={deleteRequest}
            />
          );
        })}
      </div>
      <TodoForm request={postRequest} title='ADD TODO' />
    </SC.Wrapper>
  );
};

export default TodoList;
