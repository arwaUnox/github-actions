import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from '@/components/AuthProvider';
import SignInForm from '@/components/SignInForm';
const SignInPage = () => {
  const { token } = useAuthContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [navigate, token]);
  return (
    <div className='p4-4 container flex h-screen items-center justify-center'>
      <SignInForm />
    </div>
  );
};

export default SignInPage;
