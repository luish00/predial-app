import { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../../contexts/useAuthContext';

import { useApiService } from '../../../hooks';
import { UserProp } from '../../../types';
import { LoginRequest, LoginResponse } from './services.model';

const useLoginSingIn = () => {
  const {
    authFunctions: { signIn },
  } = useAuthContext();

  const onLoginSuccess = useCallback(
    (user: UserProp) => {
      signIn(user);
    },
    [signIn],
  );

  return { onLoginSuccess };
};

export const useLoginService = () => {
  const { onLoginSuccess } = useLoginSingIn();
  const [error, setError] = useState('');

  const {
    apiCall,
    isLoading,
    result: loginState,
  } = useApiService<LoginResponse>();

  const doLogin = useCallback(
    async (body: LoginRequest) => {
      if (isLoading) {
        return;
      }

      setError('');

      const { isValid, data } = await apiCall({ path: 'user/login', body });

      if (isValid && data) {
        onLoginSuccess(data);
      } else {
        setError('Usuario o contraseña incorrecta.');
      }
    },
    [apiCall, isLoading, onLoginSuccess],
  );

  useEffect(() => {
    if (!loginState?.isValid || !loginState.data) {
      return;
    }

    const user = loginState.data;

    onLoginSuccess(user);
  }, [loginState, onLoginSuccess]);

  return { doLogin, isLoading, errorLogin: error };
};
