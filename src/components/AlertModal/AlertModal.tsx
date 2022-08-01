import { useRef, MutableRefObject, useEffect } from 'react';
import * as SC from './AlertModalStyle';

interface ModalProps {
  children?: React.ReactNode;
  message: string;
  handleConfirm: () => void;
  handleCancel?: () => void;
}

const Modal = ({ children, message, handleConfirm, handleCancel }: ModalProps) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    };
  }, []);

  const handleModalEvent = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (e.target === ref.current) {
      if (handleCancel) handleCancel();
      else handleConfirm();
    }
  };

  return (
    <SC.Wrapper onClick={handleModalEvent} ref={ref}>
      <SC.Modal>
        <SC.ModalMessage>{message}</SC.ModalMessage>
        {children}
        <SC.ButtonContainer>
          <SC.Button type='submit' onClick={handleConfirm}>
            확인
          </SC.Button>
          {handleCancel && <SC.Button onClick={handleCancel}>취소</SC.Button>}
        </SC.ButtonContainer>
      </SC.Modal>
    </SC.Wrapper>
  );
};

export default Modal;
