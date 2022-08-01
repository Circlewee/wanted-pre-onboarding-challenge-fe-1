import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import * as SC from './RegisterPageStyle';
import { registerRequest } from '@/lib/api';
import { UserForm, AlertModal } from '@/components';
import { IRequestError, IUserRequestSuccess, IUserInfo } from '@/types/types';

const RegisterPage = () => {
  const [isShow, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { mutate, isLoading, isSuccess } = useMutation<
    IUserRequestSuccess,
    AxiosError<IRequestError>,
    IUserInfo
  >(registerRequest, {
    onMutate: (variable) => {
      console.log('onMutate', variable);
    },
    onError: (error) => {
      console.log('error', error);
      if (error.response) {
        setMessage(error.response.data.details);
        setShow(true);
      }
    },
    onSuccess: (response) => {
      setMessage(response.message);
      setShow(true);
    },
  });

  function registerSubmit(data: IUserInfo) {
    mutate(data);
  }

  function handleConfirm() {
    setShow(false);
    if (isSuccess) {
      navigate('/auth');
    }
  }

  return (
    <>
      <SC.Wrapper>
        <SC.Title>회원가입</SC.Title>
        <UserForm onSubmit={registerSubmit} buttonText='회원가입' />
      </SC.Wrapper>
      {isLoading && <div>loading...</div>}
      {isShow && <AlertModal message={message} handleConfirm={handleConfirm} />}
    </>
  );
};

export default RegisterPage;
