import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { TodoListResponse } from '@/types/todoTypes';
import { ErrorResponse } from '@/types/authTypes';
import { getTodoList } from '@/lib/api';

const useGetTodoList = () => {
  return useQuery<TodoListResponse, AxiosError<ErrorResponse>>(['todoList'], getTodoList, {
    staleTime: 5000,
  });
};

export default useGetTodoList;
