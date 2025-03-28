import {
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from 'react';

import api from '@/api';
const AuthContext = createContext(undefined);

export const useAuthContext = () => {
  //undefined for accesstoken means that the token hasn't been fetched yet
  //null means that the token is fetched but it doesn't exist
  const auth = useContext(AuthContext);
  if (!auth) {
    throw Error('you should wrap ur application with authentication provider');
  }
  return auth;
};

const AuthenticationProvider = ({ children }) => {
  const [token, setToken] = useState();
  console.log('token from f', token);
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await api.get('/api/me');
        setToken(response.data.accessToken);
      } catch (e) {
        setToken(null);
      }
    };
    fetchMe();
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization = token
        ? `Bearer ${token}`
        : config.headers.Authorization;
      return config;
    });
    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 403 &&
          error.response.data.message === 'Unauthorized'
        ) {
          try {
            const response = await api.get('/api/refreshToken');
            setToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${token}`;
            originalRequest._retry = true;

            return api(originalRequest);
          } catch {
            setToken(null);
          }
        }
        return Promise.reject(error);
      },
    );
    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, [token]);
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthenticationProvider;
