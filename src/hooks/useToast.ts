import { toast, ToastOptions } from 'react-toastify';

const useToast = () => {
  const option: ToastOptions = {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
  };

  const success = (message: string) => {
    toast.success(message, option);
  };

  const error = (message: string) => {
    toast.error(message, option);
  };

  return { success, error };
};

export default useToast;
