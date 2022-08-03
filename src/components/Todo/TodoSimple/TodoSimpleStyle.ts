import styled from 'styled-components';

export const Wrapper = styled.li`
  & + & {
    margin-top: 0.5rem;
  }
`;
