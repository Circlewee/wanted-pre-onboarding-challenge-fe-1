import * as SC from './style';
import { UserForm } from '@/components';

const LoginPage = () => {
  return (
    <SC.Wrapper>
      로그인
      <UserForm />
      <SC.LoginButton>Login</SC.LoginButton>
    </SC.Wrapper>
  );
};

export default LoginPage;
