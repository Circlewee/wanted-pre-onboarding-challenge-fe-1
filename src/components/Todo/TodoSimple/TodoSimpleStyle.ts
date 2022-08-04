import styled, { css } from 'styled-components';

export const Wrapper = styled.li`
  font-size: 1.2rem;

  & + & {
    margin-top: 0.5rem;
  }

  > button {
    font-size: 1.2rem;
  }
`;

export const Todo = styled.span<{ active: boolean; isDone: boolean }>`
  padding: 3px;
  border-bottom: 1px solid ${(props) => (props.active ? '#000' : '#fff')};
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};

  ${(props) =>
    props.isDone &&
    css`
      text-decoration: line-through;
    `}
`;
