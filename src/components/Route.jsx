import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuthContext } from './AuthProvider';
import { Spinner } from './ui';

const Route = ({ children, isProtected }) => {
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (isProtected && token === null) {
      navigate('/signin', { replace: true });
      console.log(token, 'token is null');
    }
  }, [isProtected, token, navigate]);
  return token === undefined ? (
    <div className='absolute bottom-0 left-0 right-0 top-0 ml-[700px] flex items-center justify-center'>
      <Spinner />
    </div>
  ) : (
    children
  );
};

export default Route;
