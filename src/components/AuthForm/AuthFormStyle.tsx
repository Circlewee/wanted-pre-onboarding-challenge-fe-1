import styled, { css } from 'styled-components';

export const Wrapper = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
`;

export const Input = styled.input`
  width: 100%;
  margin-top: 1rem;
  padding: 5px 10px;
  border-bottom: 2px solid #000;
  font-size: 1.2rem;
`;

export const Label = styled.label`
  font-size: 1.1rem;
`;

export const LoginButton = styled.button<{ disabled: boolean }>`
  width: 100%;
  margin-top: 2rem;
  padding: 5px 0;
  border: 3px solid #000;
  border-radius: 20px;
  font-size: 1.2rem;

  ${(props) =>
    props.disabled &&
    css`
      cursor: not-allowed;
    `}
`;

export const ErrorMsg = styled.p`
  margin: 0.8rem 0;
  color: red;
  text-align: center;
  font-size: 1.2rem;
`;
