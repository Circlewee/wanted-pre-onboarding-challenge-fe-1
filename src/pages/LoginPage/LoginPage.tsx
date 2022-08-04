import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AxiosError } from 'axios';

import * as SC from './LoginPageStyle';
import { UserForm, AlertModal, Loading } from '@/components';
import { loginRequest } from '@/lib/api';
import { IUserInfo, IUserRequestSuccess, IRequestError } from '@/types/types';

const LoginPage = () => {
  const [isShow, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation<
    IUserRequestSuccess,
    AxiosError<IRequestError>,
    IUserInfo
  >(loginRequest, {
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error) => {
      if (error.response) {
        setMessage(error.response.data.details);
        setShow(true);
      }
    },
    onSuccess: (response) => {
      setMessage(response.message);
      setShow(true);
      localStorage.setItem('token', response.token);
    },
  });

  function loginSubmit(data: IUserInfo) {
    mutate(data);
  }

  function goRegister() {
    navigate('/register');
  }

  function handleConfirm() {
    setShow(false);
    if (isSuccess) {
      navigate('/');
    }
  }

  useEffect(() => {
    if (localStorage.getItem('token')) navigate('/');
  }, []);

  return (
    <>
      <SC.Wrapper>
        <SC.Title>로그인</SC.Title>
        <UserForm onSubmit={loginSubmit} buttonText='로그인' />
        <SC.RegisterButton onClick={goRegister}>회원가입</SC.RegisterButton>
      </SC.Wrapper>
      {isLoading && <div>loading...</div>}
      {isShow && <AlertModal message={message} handleConfirm={handleConfirm} />}
    </>
  );
};

export default LoginPage;
