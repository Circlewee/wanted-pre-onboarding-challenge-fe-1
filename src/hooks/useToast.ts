import { toast, ToastPosition } from 'react-toastify';

const useToast = () => {
  const option = {
    position: 'top-center' as ToastPosition,
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  };

  function success(message: string) {
    return toast.success(message, option);
  }

  function error(message: string) {
    return toast.error(message, option);
  }

  return { success, error };
};

export default useToast;
