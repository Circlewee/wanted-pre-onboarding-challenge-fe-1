import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;

  * + * {
    margin-top: 2rem;
  }
`;

export const TodoInput = styled.input`
  padding: 8px 10px;
  border-bottom: 1px solid #000;
  font-size: 1.2rem;
`;

export const PostButton = styled.button`
  align-self: flex-end;
  font-size: 1.1rem;
`;
