import { useParams } from 'react-router-dom';
import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import * as SC from './TodoDetailStyle';
import { updateTodo, getTodoById } from '@/lib/api';
import { IFormType } from '@/types/todoTypes';
import TodoForm from '../TodoForm/TodoForm';

const TodoDetail = () => {
  const [updateMode, setUpdateMode] = useState(false);
  const { todoId } = useParams();

  const { data, refetch } = useQuery(['todo'], () => {
    return getTodoById(todoId);
  });

  const queryClient = useQueryClient();
  const updateMutation = useMutation(updateTodo, {
    onSuccess() {
      queryClient.invalidateQueries(['todoList']);
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
      {!updateMode ? (
        <>
          <SC.TodoTitle>{data?.data.title}</SC.TodoTitle>
          <SC.TodoContent>{data?.data.content}</SC.TodoContent>
          <button onClick={setMode}>📝</button>
        </>
      ) : (
        <TodoForm
          request={updateRequest}
          title={'UPDATE TODO'}
          default={data?.data}
          cancelUpdate={cancelUpdate}
        />
      )}
    </SC.Wrapper>
  );
};

export default TodoDetail;
