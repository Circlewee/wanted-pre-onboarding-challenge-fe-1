import styled from 'styled-components';

export const Wrapper = styled.li`
  & + & {
    margin-top: 0.5rem;
  }
`;

export const Todo = styled.span`
  cursor: pointer;
`;
