import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@/types/authTypes';
import { TodoResponse, TodoInput } from '@/types/todoTypes';
import { postTodo } from '@/lib/api';

const usePostMutation = (
  options?: UseMutationOptions<TodoResponse, AxiosError<ErrorResponse>, TodoInput>
) => {
  return useMutation<TodoResponse, AxiosError<ErrorResponse>, TodoInput>(postTodo, options);
};

export default usePostMutation;
