import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import * as SC from './TodoDetailStyle';
import { updateTodo, getTodoById } from '@/lib/api';
import getDateString from '@/lib/getDateString';
import { TodoInput, TodoResponse } from '@/types/todoTypes';
import useToast from '@/hooks/useToast';
import TodoForm from '../TodoForm/TodoForm';
import { ErrorResponse } from '@/types/authTypes';
import Skeleton from '@/components/Skeleton/Skeleton';
import useSkeleton from '@/hooks/useSkeleton';

const TodoDetail = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const { todoId } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isVisible, setQueryState } = useSkeleton();

  const { data, refetch, isLoading, isFetching } = useQuery<
    TodoResponse,
    AxiosError<ErrorResponse>
  >(['todo'], () => {
    return getTodoById(todoId);
  });

  const updateMutation = useMutation<
    TodoResponse,
    AxiosError<ErrorResponse>,
    { id: string; todo: TodoInput }
  >(updateTodo, {
    onError(error) {
      if (error.response) {
        toast.error(error.response.data.details);
      } else {
        toast.error('Todo 업데이트 실패');
      }
    },
    onSuccess() {
      queryClient.invalidateQueries(['todoList']);
      toast.success('Todo 업데이트 성공!');
      refetch();
      setUpdateMode(false);
    },
  });

  const setMode = () => {
    setUpdateMode(true);
  };

  const updateRequest = (data: TodoInput, id?: string) => {
    if (id) {
      updateMutation.mutate({ id, todo: data });
    }
  };

  const cancelUpdate = () => {
    setUpdateMode(false);
  };

  useEffect(() => {
    refetch();
  }, [todoId]);

  useEffect(() => {
    setQueryState({ isLoading, isFetching });
  }, [isLoading, isFetching]);

  if (updateMode) {
    return (
      <SC.Wrapper>
        <TodoForm
          request={updateRequest}
          title={'UPDATE TODO'}
          default={data?.data}
          cancelUpdate={cancelUpdate}
        />
      </SC.Wrapper>
    );
  }

  return (
    <SC.Wrapper>
      {isVisible ? (
        <>
          <div>
            <h2>{data?.data.title}</h2>
            <SC.UpdateButton onClick={setMode}>📝</SC.UpdateButton>
          </div>
          <div>
            <SC.TodoContent>{data?.data.content}</SC.TodoContent>
            <SC.Date>{getDateString(data?.data.createdAt)}</SC.Date>
          </div>
        </>
      ) : (
        <>
          <div>
            <h2>
              <Skeleton width={15} height={1.5} />
            </h2>
            <SC.UpdateButton>📝</SC.UpdateButton>
          </div>
          <div>
            <SC.TodoContent>
              <Skeleton width={15} height={1.5} />
            </SC.TodoContent>
            <SC.Date>
              <Skeleton width={10} height={1.5} />
            </SC.Date>
          </div>
        </>
      )}
    </SC.Wrapper>
  );
};

export default TodoDetail;
