import React, { createContext, useContext, useMemo, useReducer } from 'react';

interface Props {
  children: React.ReactNode;
}

interface ActionProp {
  type: ACTIONS;
  focusPocus?: { [k: string]: boolean } | undefined;
  onSubmitEditing?: ((event: any) => void) | undefined;
}

interface ActionStateProps {
  focusPocus: { [k: string]: boolean } | undefined;
  onSubmitEditing?: ((event: any) => void) | undefined;
}

const INITIAL_STATE: ActionStateProps = {
  focusPocus: {},
  onSubmitEditing: undefined,
};

enum ACTIONS {
  init = 'INIT',
  onNextFocus = 'NEXT_FOCUS',
}

type OnNextFocusType = (_data: { [k: string]: boolean }) => void;
type InitType = (_data: ActionStateProps) => void;

interface FunctionContextType {
  onNextFocus: OnNextFocusType;
  init: InitType;
}

interface ContextType {
  formFunctions: FunctionContextType;
  formState: typeof INITIAL_STATE;
}

/* eslint-disable prettier/prettier */
const defaultContext: ContextType = {
  formFunctions: {
    onNextFocus: (_data: { [k: string]: boolean }) => { },
    init: (_data: ActionStateProps) => { },
  },
  formState: INITIAL_STATE,
};

export const FormContext = createContext(defaultContext);

export function useFormContext() {
  return useContext(FormContext);
}

function reducer(
  prevState: ActionStateProps,
  action: ActionProp,
): ActionStateProps {
  const { focusPocus, onSubmitEditing, type } = action;

  switch (type) {
    case ACTIONS.init:
      return {
        ...prevState,
        focusPocus: focusPocus,
        onSubmitEditing: onSubmitEditing,
      };
    case ACTIONS.onNextFocus:
      return {
        ...prevState,
        focusPocus: focusPocus,
      };
    default:
      return prevState;
  }
}

function useProviderForm() {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const formFunctions = useMemo(
    () => ({
      init: ({ focusPocus, onSubmitEditing }: ActionStateProps) => {
        dispatch({ type: ACTIONS.init, focusPocus, onSubmitEditing });
      },
      onNextFocus: (data: { [k: string]: boolean }) => {
        dispatch({ type: ACTIONS.onNextFocus, focusPocus: data });
      },
    }),
    [],
  );

  return { formFunctions, formState: state };
}

export const FormProvider: React.FC<Props> = ({ children }) => {
  const value = useProviderForm();

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};
