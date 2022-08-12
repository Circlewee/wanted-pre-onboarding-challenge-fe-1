import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 1rem;
  border-top: 5px solid #000;

  > div {
    display: flex;
    justify-content: space-between;
  }
`;

export const TodoContent = styled.article`
  font-size: 1.2rem;
`;

export const UpdateButton = styled.button`
  margin-block: auto;
  font-size: 1.2rem;
`;

export const Date = styled.div`
  margin: 0;
`;
