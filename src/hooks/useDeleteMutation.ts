import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { ErrorResponse } from '@/types/authTypes';
import { deleteTodo } from '@/lib/api';

const useDeleteMutation = (
  options?: UseMutationOptions<string, AxiosError<ErrorResponse>, string>
) => {
  return useMutation<string, AxiosError<ErrorResponse>, string>(deleteTodo, options);
};

export default useDeleteMutation;
