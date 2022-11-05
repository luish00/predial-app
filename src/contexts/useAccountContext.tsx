/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { AccountDetailsProp, ContactProp } from '../types';

interface Props {
  children: React.ReactNode;
}

interface ActionProp {
  type: ACTIONS;
  payload?: AccountDetailsProp | null | undefined;
  contacts?: ContactProp[] | null | undefined;
}

interface ActionStateProps {
  account: AccountDetailsProp | null | undefined;
  contacts: ContactProp[] | null | undefined;
}

const INITIAL_STATE: ActionStateProps = {
  account: null,
  contacts: [],
};

enum ACTIONS {
  loadAccount = 'ACCOUNT_LOADED',
  loadContacts = 'CONTACTS_LOADED'
}

const defaultContext = {
  accountFunctions: {
    loadAccount: async (_data: AccountDetailsProp) => { },
    loadContacts: async (_data: ContactProp[]) => { },
  },
  accountState: INITIAL_STATE,
};

const AccountContext = createContext(defaultContext);

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
    case ACTIONS.loadContacts:
      return {
        ...prevState,
        contacts: action.contacts,
      };
    default:
      return prevState;
  }
}

function useProvider() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const accountFunctions = useMemo(
    () => ({
      loadAccount: async (data: AccountDetailsProp) => {
        dispatch({ type: ACTIONS.loadAccount, payload: data });
      },
      loadContacts: async (data: ContactProp[]) => {
        dispatch({ type: ACTIONS.loadContacts, contacts: data });
      },
    }),
    [],
  );

  return { accountFunctions, accountState: state };
}

export const AccountProvider: React.FC<Props> = ({ children }) => {
  const account = useProvider();

  return <AccountContext.Provider value={account}>{children}</AccountContext.Provider>;
};
