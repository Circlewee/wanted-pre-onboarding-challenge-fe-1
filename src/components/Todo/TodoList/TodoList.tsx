import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import * as SC from './TodoListStyle';
import { getTodoList, postTodo, deleteTodo } from '@/lib/api';
import { ErrorResponse } from '@/types/authTypes';
import { TodoInput, TodoResponse } from '@/types/todoTypes';
import TodoSimple from '../TodoSimple/TodoSimple';
import TodoForm from '../TodoForm/TodoForm';
import useToast from '@/hooks/useToast';
import Skeleton from '@/components/Skeleton/Skeleton';
import useSkeleton from '@/hooks/useSkeleton';

const TodoList = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const toast = useToast();
  const { isVisible, setQueryState } = useSkeleton();

  const { data, refetch, isLoading, isFetching } = useQuery(['todoList'], getTodoList, {
    staleTime: 5000,
  });

  const postMutation = useMutation<TodoResponse, AxiosError<ErrorResponse>, TodoInput>(postTodo, {
    onError(error) {
      if (error.response) {
        toast.error(error.response.data.details);
      } else {
        toast.error('Todo 등록 실패');
      }
    },
    onSuccess(response) {
      /* setQueryData와 invalidateQueries는 같은 기능을 한다.
       * 다만 invalidateQueries는 적은 코드, 요청 1회 추가
       * setQueryData는 좀 더 많은 코드, 요청 없음, 응답으로 필드를 컨트롤 할 수 있음 이라는 차이점이 있다.
       * 혹은 refetch()도 존재한다. */
      // queryClient.invalidateQueries(['todoList']);
      // queryClient.setQueryData(
      //   ['todoList'],
      //   (old: TodoListResponse | undefined): TodoListResponse => {
      //     if (old) {
      //       return { data: [...old.data, response.data] };
      //     }
      //     return { data: [response.data] };
      //   }
      // );
      toast.success('Todo 등록 성공!');
      refetch();
      navigate(`/${response.data.id}`);
    },
  });

  const deleteMutation = useMutation<string, AxiosError<ErrorResponse>, string>(deleteTodo, {
    onError(error) {
      if (error.response) {
        toast.error(error.response.data.details);
      } else {
        toast.error('Todo 삭제 실패');
      }
    },
    onSuccess(data) {
      toast.success('Todo 삭제 성공!');
      refetch();
      if (data === todoId) {
        navigate('/');
      }
    },
  });

  const postRequest = (data: TodoInput) => {
    postMutation.mutate(data);
  };

  const deleteRequest = (id: string) => {
    deleteMutation.mutate(id);
  };

  useEffect(() => {
    setQueryState({ isLoading, isFetching });
  }, [isLoading, isFetching]);

  return (
    <SC.Wrapper>
      <div>
        <h2>TODO List</h2>
        {!isVisible ? (
          <Skeleton width={15} height={1.5} amount={4} />
        ) : data && data.data.length !== 0 ? (
          data.data.map((todo) => {
            return (
              <TodoSimple
                key={todo.id}
                todo={todo}
                active={todoId === todo.id}
                deleteRequest={deleteRequest}
              />
            );
          })
        ) : (
          <p>TODO가 없습니다. 오른쪽에서 추가해보세요!</p>
        )}
      </div>
      <TodoForm request={postRequest} title='ADD TODO' />
    </SC.Wrapper>
  );
};

export default TodoList;
