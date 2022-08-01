import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  border-bottom: 2px solid #000;
  font-size: 1.2rem;

  & + & {
    margin-top: 1rem;
  }
`;
