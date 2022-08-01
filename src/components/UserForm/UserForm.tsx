import { useForm } from 'react-hook-form';

import * as SC from './UserFormStyle';
import { IUserInfo } from '@/types/types';

interface IFormProps {
  onSubmit: (data: IUserInfo) => void;
}

const UserForm = ({ onSubmit }: IFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IUserInfo>({ mode: 'onChange' });

  return (
    <SC.Wrapper onSubmit={handleSubmit(onSubmit)}>
      <SC.InputWrapper>
        <SC.Label htmlFor='emailInput'>Email</SC.Label>
        <SC.Input
          id='emailInput'
          type='text'
          placeholder='email'
          {...register('email', {
            required: true,
            pattern: /^[\w]+@([\w-]+\.)+[\w-]{2,4}$/,
          })}
        />
        {errors.email && (
          <SC.ErrorMsg>
            {errors.email.type === 'required' && '필수 입력 항목입니다.'}
            {errors.email.type === 'pattern' && '올바른 이메일이 아닙니다.'}
          </SC.ErrorMsg>
        )}
      </SC.InputWrapper>
      <SC.InputWrapper>
        <SC.Label htmlFor='passwordInput'>Password</SC.Label>
        <SC.Input
          id='passwordInput'
          type='password'
          placeholder='password'
          {...register('password', { required: true, minLength: 8 })}
        />
        {errors.password && (
          <SC.ErrorMsg>
            {errors.password.type === 'required' && '필수 입력 항목입니다.'}
            {errors.password.type === 'minLength' && '8자리 이상 입력하세요.'}
          </SC.ErrorMsg>
        )}
      </SC.InputWrapper>
      <SC.LoginButton type='submit' disabled={!!errors.email || !!errors.password}>
        로그인
      </SC.LoginButton>
    </SC.Wrapper>
  );
};

export default UserForm;
