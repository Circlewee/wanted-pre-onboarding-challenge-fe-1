import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { TodoResponse } from '@/types/todoTypes';
import { ErrorResponse } from '@/types/authTypes';
import { getTodoById } from '@/lib/api';

const useGetTodoById = (todoId: string | undefined) => {
  return useQuery<TodoResponse, AxiosError<ErrorResponse>>(['todo'], () => {
    return getTodoById(todoId);
  });
};

export default useGetTodoById;
