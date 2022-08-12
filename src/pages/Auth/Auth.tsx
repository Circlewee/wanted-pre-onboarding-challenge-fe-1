import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import useToast from '@/hooks/useToast';

const Auth = () => {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      toast.success('이미 로그인이 되어있습니다.');
      navigate('/');
    } else {
      navigate('signin');
    }
  }, []);

  return <Outlet />;
};

export default Auth;
