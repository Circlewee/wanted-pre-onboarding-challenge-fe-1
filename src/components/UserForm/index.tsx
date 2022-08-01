import * as SC from './style';

const UserForm = () => {
  return (
    <SC.Wrapper>
      <SC.Input type='text' placeholder='email' />
      <SC.Input type='password' placeholder='password' />
    </SC.Wrapper>
  );
};

export default UserForm;
