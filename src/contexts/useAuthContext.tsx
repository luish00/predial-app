/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useMemo, useReducer } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ActionProp {
  type: ACTIONS;
  payload?: string;
}

interface ActionStateProps {
  isLoading: boolean;
  isSignout: boolean;
  userToken: string | null | undefined;
}

const AUTH_STATE = {
  isLoading: true,
  isSignout: false,
  userToken: null,
};

enum ACTIONS {
  restoreToken = 'RESTORE_TOKEN',
  singIn = 'SIGN_IN',
  singOut = 'SIGN_OUT',
}

const defaultContext = {
  authFunctions: {
    signIn: async (_data: string) => { },
    signOut: () => { },
    signUp: async (_data: string) => { },
  },
  authState: AUTH_STATE,
};

export const AuthContext = createContext(defaultContext);

export function useAuthContext() {
  return useContext(AuthContext);
}

function authReducer(prevState: ActionStateProps, action: ActionProp): ActionStateProps {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.restoreToken:
      return {
        ...prevState,
        userToken: payload,
        isLoading: false,
      };
    case ACTIONS.singIn:
      return {
        ...prevState,
        isSignout: false,
        userToken: payload,
      };
    case ACTIONS.singOut:
      return {
        ...prevState,
        isSignout: true,
        userToken: null,
      };
    default:
      return prevState;
  }
}

export function useProviderAuth() {
  const [state, dispatch] = useReducer(authReducer, AUTH_STATE);

  const authFunctions = useMemo(
    () => ({
      signIn: async (data = 'dummy-auth-token') => {
        dispatch({ type: ACTIONS.singIn, payload: data });
      },
      signOut: () => dispatch({ type: ACTIONS.singOut }),
      signUp: async (data = 'dummy-auth-token') => {
        dispatch({ type: ACTIONS.singIn, payload: data });
      },
    }),
    [],
  );

  return { authFunctions, authState: state };
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
