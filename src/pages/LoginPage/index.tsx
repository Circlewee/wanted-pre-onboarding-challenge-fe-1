import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import * as SC from './style';
import { UserForm } from '@/components';
import { loginRequest } from '@/lib/api';
import { IUserInfo } from '@/types/types';

const LoginPage = () => {
  const navigate = useNavigate();
  const loginMutation = useMutation(loginRequest, {
    onMutate: (variable) => {
      console.log('onMutate', variable);
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onError: (error, variable, context) => {
      // error
    },
    onSuccess: (data, variables, context) => {
      console.log('success', data, variables, context);
    },
    onSettled: () => {
      console.log('end');
    },
  });

  function loginSubmit(data: IUserInfo) {
    loginMutation.mutate(data);
  }

  function goRegister() {
    navigate('/register');
  }

  return (
    <SC.Wrapper>
      <SC.Title>로그인</SC.Title>
      <UserForm onSubmit={loginSubmit} />
      <SC.RegisterButton onClick={goRegister}>회원가입</SC.RegisterButton>
    </SC.Wrapper>
  );
};

export default LoginPage;
