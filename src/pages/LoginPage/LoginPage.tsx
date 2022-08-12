import * as SC from './LoginPageStyle';
import { AuthForm, Loading } from '@/components';
import useAuth from '@/hooks/useAuth';

const LoginPage = () => {
  const { authMutation, toast, queryClient, navigate, submitAction } = useAuth('/users/login', {
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
    navigate('/auth/signup');
  }

  return (
    <>
      <SC.Wrapper>
        <SC.Title>로그인</SC.Title>
        <AuthForm submitAction={submitAction} buttonText='로그인' />
        <SC.RegisterButton onClick={goRegister}>회원가입</SC.RegisterButton>
      </SC.Wrapper>
      {authMutation.isLoading && <Loading />}
    </>
  );
};

export default LoginPage;
