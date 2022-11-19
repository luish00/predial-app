import { useEffect } from 'react';
import { useState, useCallback } from 'react';
// import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import { AccountDetailsProp } from '../../../../../types';

const useAccountState = (account: AccountDetailsProp | null | undefined) => {
  const [state, setState] = useState<AccountDetailsProp | null | undefined>(
    account,
  );

  const onChangeText = useCallback(event => {
    const {
      nativeEvent: { text },
      _dispatchInstances: { memoizedProps },
    } = event;

    const { nativeID } = memoizedProps;

    if (nativeID) {
      setState(prev => (prev ? { ...prev, [nativeID]: text } : prev));
    }
  }, []);

  useEffect(() => {
    if (state) {
      return;
    }

    setState(account);
  }, [account, state]);

  return {
    accountReducer: state,
    onChangeTextAccount: onChangeText,
  };
};

export { useAccountState };
