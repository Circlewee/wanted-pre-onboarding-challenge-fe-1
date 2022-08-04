import styled, { keyframes } from 'styled-components';

const preloader = keyframes`
  100% { transform: scale(2); }
`;

const Loader = styled.div`
  background-color: rgba(255, 255, 255, 0.7);
  overflow: hidden;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  z-index: 100000;
`;

const LoaderElement = styled.span`
  border-radius: 100%;
  border: 8px solid #555;
  margin: calc(8px * 2);

  &:nth-child(1) {
    animation: ${preloader} 0.4s ease-in-out alternate infinite;
  }

  &:nth-child(2) {
    animation: ${preloader} 0.4s ease-in-out alternate 0.2s infinite;
  }

  &:nth-child(3) {
    animation: ${preloader} 0.4s ease-in-out alternate 0.4s infinite;
  }
`;

const Loading = () => {
  return (
    <Loader>
      <LoaderElement />
      <LoaderElement />
      <LoaderElement />
    </Loader>
  );
};

export default Loading;
