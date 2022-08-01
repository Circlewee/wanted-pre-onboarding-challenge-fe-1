import * as SC from './style';
import { UserForm } from '@/components';

const LoginPage = () => {
  return (
    <SC.Wrapper>
      <SC.Title>로그인</SC.Title>
      <UserForm />
      <SC.LoginButton>Login</SC.LoginButton>
    </SC.Wrapper>
  );
};

export default LoginPage;
