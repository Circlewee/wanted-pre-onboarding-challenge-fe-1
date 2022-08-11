import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { AxiosError } from 'axios';

import * as SC from './LoginPageStyle';
import { UserForm, Loading } from '@/components';
import { loginRequest } from '@/lib/api';
import { IUserInfo, IUserRequestSuccess, IRequestError } from '@/types/authTypes';
import useToast from '@/hooks/useToast';

const LoginPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation<
    IUserRequestSuccess,
    AxiosError<IRequestError>,
    IUserInfo
  >(loginRequest, {
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.details);
      } else {
        toast.error('로그인 실패');
      }
    },
    onSuccess: (response) => {
      queryClient.clear();
      toast.success(response.message);
      navigate('/');
      localStorage.setItem('token', response.token);
    },
  });

  function loginSubmit(data: IUserInfo) {
    mutate(data);
  }

  function goRegister() {
    navigate('/register');
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      toast.success('이미 로그인이 되어있습니다.');
      navigate('/');
    }
  }, []);

  return (
    <>
      <SC.Wrapper>
        <SC.Title>로그인</SC.Title>
        <UserForm onSubmit={loginSubmit} buttonText='로그인' />
        <SC.RegisterButton onClick={goRegister}>회원가입</SC.RegisterButton>
      </SC.Wrapper>
      {isLoading && <Loading />}
    </>
  );
};

export default LoginPage;
