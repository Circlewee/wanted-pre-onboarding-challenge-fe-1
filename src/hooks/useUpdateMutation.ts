import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@/types/authTypes';
import { TodoResponse, TodoInput } from '@/types/todoTypes';
import { updateTodo } from '@/lib/api';

const useUpdateMutation = (
  options?: UseMutationOptions<
    TodoResponse,
    AxiosError<ErrorResponse>,
    { id: string; todo: TodoInput }
  >
) => {
  return useMutation<TodoResponse, AxiosError<ErrorResponse>, { id: string; todo: TodoInput }>(
    updateTodo,
    options
  );
};

export default useUpdateMutation;
