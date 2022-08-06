import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { AxiosError } from 'axios';

import * as SC from './TodoDetailStyle';
import { updateTodo, getTodoById } from '@/lib/api';
import getDateString from '@/lib/getDateString';
import { IFormType, ITodoResponse } from '@/types/todoTypes';
import useToast from '@/hooks/useToast';
import TodoForm from '../TodoForm/TodoForm';
import { IRequestError } from '@/types/types';

const TodoDetail = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const { todoId } = useParams();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data, refetch } = useQuery<ITodoResponse, AxiosError<IRequestError>, ITodoResponse>(
    ['todo'],
    (): Promise<ITodoResponse> => {
      return getTodoById(todoId);
    }
  );

  const updateMutation = useMutation<
    ITodoResponse,
    AxiosError<IRequestError>,
    { id: string; todo: IFormType }
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

  function setMode() {
    setUpdateMode(true);
  }

  function updateRequest(data: IFormType, id?: string) {
    if (id) {
      updateMutation.mutate({ id, todo: data });
    }
  }

  function cancelUpdate() {
    setUpdateMode(false);
  }

  useEffect(() => {
    refetch();
  }, [todoId]);

  return (
    <SC.Wrapper>
      {updateMode ? (
        <TodoForm
          request={updateRequest}
          title={'UPDATE TODO'}
          default={data?.data}
          cancelUpdate={cancelUpdate}
        />
      ) : (
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
      )}
    </SC.Wrapper>
  );
};

export default TodoDetail;
