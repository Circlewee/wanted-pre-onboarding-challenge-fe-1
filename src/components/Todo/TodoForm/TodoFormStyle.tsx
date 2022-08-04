import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  * + * {
    margin-top: 2rem;
  }

  > div {
    display: flex;
    align-self: flex-end;
  }
`;

export const TodoInput = styled.input`
  padding: 8px 10px;
  border-bottom: 1px solid #000;
  font-size: 1.2rem;
`;

export const ActionButton = styled.button`
  margin: 0;
  padding: 8px 12px;
  background-color: #000;
  font-size: 1.1rem;
  color: #fff;
  border-radius: 20px;

  & + & {
    margin-left: 10px;
  }
`;
