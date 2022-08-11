import * as SC from './RegisterPageStyle';
import { AuthForm, Loading } from '@/components';
import useAuth from '@/hooks/useAuth';

const RegisterPage = () => {
  const { authMutation, toast, navigate, submitAction } = useAuth('/users/login', {
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

  return (
    <>
      <SC.Wrapper>
        <SC.Title>회원가입</SC.Title>
        <AuthForm submitAction={submitAction} buttonText='회원가입' />
      </SC.Wrapper>
      {authMutation.isLoading && <Loading />}
    </>
  );
};

export default RegisterPage;
