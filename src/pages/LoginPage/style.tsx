import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 300px;

  > * + * {
    margin-top: 2rem;
  }
`;

export const Title = styled.p`
  margin: 0;
  font-size: 1.4rem;
`;

export const LoginButton = styled.button`
  font-size: 1.2rem;
`;
