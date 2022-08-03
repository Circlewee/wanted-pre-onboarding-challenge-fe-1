import styled from 'styled-components';

export const Wrapper = styled.li`
  & + & {
    margin-top: 0.5rem;
  }
`;

export const Todo = styled.span<{ active: boolean }>`
  padding: 3px;
  border-bottom: 1px solid ${(props) => (props.active ? '#000' : '#fff')};
  cursor: ${(props) => (props.active ? 'default' : 'pointer')};
`;
