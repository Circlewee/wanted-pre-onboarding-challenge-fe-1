import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import * as SC from './RegisterPageStyle';
import { registerRequest } from '@/lib/api';
import { UserForm, Loading } from '@/components';
import { IRequestError, IUserRequestSuccess, IUserInfo } from '@/types/authTypes';
import useToast from '@/hooks/useToast';

const RegisterPage = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const { mutate, isLoading } = useMutation<
    IUserRequestSuccess,
    AxiosError<IRequestError>,
    IUserInfo
  >(registerRequest, {
    onError: (error) => {
      if (error.response) {
        toast.error(error.response.data.details);
      } else {
        toast.error('회원가입 실패');
      }
    },
    onSuccess: (response) => {
      toast.success(response.message);
      navigate('/auth');
    },
  });

  function registerSubmit(data: IUserInfo) {
    mutate(data);
  }

  return (
    <>
      <SC.Wrapper>
        <SC.Title>회원가입</SC.Title>
        <UserForm onSubmit={registerSubmit} buttonText='회원가입' />
      </SC.Wrapper>
      {isLoading && <Loading />}
    </>
  );
};

export default RegisterPage;
