import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  overflow: hidden;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 9998;
`;

export const Modal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  max-width: 380px;
  height: 300px;
  padding: 1rem 1.5rem;
  background-color: #fff;
  border-radius: 20px;
  z-index: 9999;
`;

export const ModalMessage = styled.p`
  font-size: 1.4rem;
  text-align: center;
`;

export const ButtonContainer = styled.div`
  margin-top: 1.3rem;
`;

export const Button = styled.button`
  font-size: 1.2rem;
  margin: 1rem;
`;
