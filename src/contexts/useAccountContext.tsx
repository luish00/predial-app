/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { AccountDetailsProp } from '../types';

interface Props {
  children: React.ReactNode;
}

interface ActionProp {
  type: ACTIONS;
  payload?: AccountDetailsProp;
}

interface ActionStateProps {
  account: AccountDetailsProp | undefined | null;
}

const INITIAL_STATE: ActionStateProps = {
  account: null,
};

enum ACTIONS {
  loadAccount = 'LOAD_ACCOUNT',
}

const defaultContext = {
  accountFunctions: {
    loadAccount: async (_data: AccountDetailsProp) => { },
    signIn: async (_data: string) => { },
  },
  accountState: INITIAL_STATE,
};

export const AccountContext = createContext(defaultContext);

export function useAccountContext() {
  return useContext(AccountContext);
}

function reducer(prevState: ActionStateProps, action: ActionProp): ActionStateProps {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.loadAccount:
      return {
        ...prevState,
        account: payload,
      };
    default:
      return prevState;
  }
}

export function useProviderAccount() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const accountFunctions = useMemo(
    () => ({
      loadAccount: async (data: AccountDetailsProp) => {
        dispatch({ type: ACTIONS.loadAccount, payload: data });
      },
    }),
    [],
  );

  return { accountFunctions, accountStat0e: state };
}

export const AccountProvider: React.FC<Props> = ({ children }) => {
  const account = useProviderAccount();

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
};
