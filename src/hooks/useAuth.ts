import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

import useToast from './useToast';
import { authRequest } from '@/lib/api';
import { AuthResponse, AuthData, ErrorResponse } from '@/types/authTypes';

const useAuth = (
  endPoint: string,
  options?: UseMutationOptions<AuthResponse, AxiosError<ErrorResponse>, AuthData>
) => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const authMutation = useMutation<AuthResponse, AxiosError<ErrorResponse>, AuthData>(
    authRequest(endPoint),
    options
  );

  const submitAction = (data: AuthData) => {
    authMutation.mutate(data);
  };

  return { authMutation, toast, queryClient, navigate, submitAction };
};

export default useAuth;
