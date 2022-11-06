/* eslint-disable prettier/prettier */
import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { AccountDetailsProp, ContactProp } from '../types';

interface Props {
  children: React.ReactNode;
}

interface ActionProp {
  addContact?: ContactProp | null | undefined;
  contacts?: ContactProp[] | null | undefined;
  payload?: AccountDetailsProp | null | undefined;
  type: ACTIONS;
  updatedContact?: ContactProp | null | undefined;
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
  addContact = 'CONTACTS_ADDED',
  loadAccount = 'ACCOUNT_LOADED',
  loadContacts = 'CONTACTS_LOADED',
  updateContact = 'CONTACTS_UPDATED',
}

const defaultContext = {
  accountFunctions: {
    addContact: async (_data: ContactProp) => { },
    loadAccount: async (_data: AccountDetailsProp) => { },
    loadContacts: async (_data: ContactProp[]) => { },
    updateAccount: async (_data: ContactProp) => { },
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
    case ACTIONS.updateContact:
      console.log('reducer', { contacs: prevState.contacts, action })
      return {
        ...prevState,
        contacts: prevState.contacts && prevState.contacts.map(item => {
          if (item.Id === action.updatedContact?.Id) {
            console.log('updated', action.updatedContact)
            return action.updatedContact;
          }

          return item;
        }),
      };
    case ACTIONS.addContact:
      return {
        ...prevState,
        contacts: [...prevState.contacts, action.updatedContact],
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
      updateAccount: async (data: ContactProp) => {
        dispatch({ type: ACTIONS.updateContact, updatedContact: data });
      },
      addContact: async (data: ContactProp) => {
        dispatch({ type: ACTIONS.addContact, updatedContact: data });
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
