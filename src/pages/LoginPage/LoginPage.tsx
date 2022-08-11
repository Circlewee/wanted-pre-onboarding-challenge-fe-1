import { useEffect } from 'react';

import * as SC from './LoginPageStyle';
import { UserForm, Loading } from '@/components';
import useAuth from '@/hooks/useAuth';

const LoginPage = () => {
  const { authMutation, toast, queryClient, navigate, submitAction } = useAuth('/users/create', {
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
        <UserForm onSubmit={submitAction} buttonText='로그인' />
        <SC.RegisterButton onClick={goRegister}>회원가입</SC.RegisterButton>
      </SC.Wrapper>
      {authMutation.isLoading && <Loading />}
    </>
  );
};

export default LoginPage;
