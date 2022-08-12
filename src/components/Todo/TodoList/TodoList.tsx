import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';

import * as SC from './TodoListStyle';
import { TodoInput } from '@/types/todoTypes';
import TodoSimple from '../TodoSimple/TodoSimple';
import TodoForm from '../TodoForm/TodoForm';
import useToast from '@/hooks/useToast';
import Skeleton from '@/components/Skeleton/Skeleton';
import useSkeleton from '@/hooks/useSkeleton';
import useGetTodoList from '@/hooks/useGetTodoList';
import usePostMutation from '@/hooks/usePostMutation';
import useDeleteMutation from '@/hooks/useDeleteMutation';

const TodoList = () => {
  const navigate = useNavigate();
  const { todoId } = useParams();
  const toast = useToast();
  const { isVisible, setQueryState } = useSkeleton();

  const { data, refetch, isLoading, isFetching } = useGetTodoList();

  const postMutation = usePostMutation({
    onError(error) {
      if (error.response) {
        toast.error(error.response.data.details);
      } else {
        toast.error('Todo 등록 실패');
      }
    },
    onSuccess(response) {
      toast.success('Todo 등록 성공!');
      refetch();
      navigate(`/${response.data.id}`);
    },
  });

  const deleteMutation = useDeleteMutation({
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
