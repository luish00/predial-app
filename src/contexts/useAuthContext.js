import React, { createContext, useContext, useMemo, useReducer } from 'react';

export const AuthContext = createContext();

export function useAuthContext() {
  return useContext(AuthContext);
}

const AUTH_STATE = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

const actions = {
  restoreToken: 'RESTORE_TOKEN',
  singIn: 'SIGN_IN',
  singOut: 'SIGN_OUT',
};

export function useProviderAuth() {
  const [state, dispatch] = useReducer((prevState, action) => {
    switch (action.type) {
      case action.restoreToken:
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case action.singIn:
        return {
          ...prevState,
          isSignout: false,
          userToken: action.token,
        };
      case actions.singOut:
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  }, AUTH_STATE);

  const authFunctions = useMemo(
    () => ({
      signIn: async (data = 'dummy-auth-token') => {
        dispatch({ type: actions.singIn, token: data });
      },
      signOut: () => dispatch({ type: actions.singOut }),
      signUp: async (data = 'dummy-auth-token') => {
        dispatch({ type: actions.singIn, token: data });
      },
    }),
    [],
  );

  return { authFunctions, authState: state };
}

export const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
