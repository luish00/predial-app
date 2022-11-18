/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { UserProp } from '../types';

interface Props {
  children: React.ReactNode;
}

interface ActionProp {
  type: ACTIONS;
  payload?: {
    user?: UserProp
  };
}

interface ActionStateProps {
  isLoading: boolean;
  user: UserProp | undefined | null;
  userToken: string | undefined | null;
}

const AUTH_STATE: ActionStateProps = {
  isLoading: true,
  user: null,
  userToken: null,
};

enum ACTIONS {
  restoreToken = 'RESTORE_TOKEN',
  singIn = 'SIGN_IN',
  singOut = 'SIGN_OUT',
}

const defaultContext = {
  authFunctions: {
    signIn: async (_data: UserProp) => { },
    signOut: () => { },
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
        user: payload?.user,
        isLoading: false,
      };
    case ACTIONS.singIn:
      return {
        ...prevState,
        user: payload?.user,
        userToken: payload?.user?.access_token,
      };
    case ACTIONS.singOut:
      return {
        ...prevState,
        user: null,
      };
    default:
      return prevState;
  }
}

function useProviderAuth() {
  const [state, dispatch] = useReducer(authReducer, AUTH_STATE);

  const authFunctions = useMemo(
    () => ({
      signIn: async (data: UserProp) => {
        dispatch({ type: ACTIONS.singIn, payload: { user: data } });
      },
      signOut: () => dispatch({ type: ACTIONS.singOut }),
    }),
    [],
  );

  return { authFunctions, authState: state };
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const auth = useProviderAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
