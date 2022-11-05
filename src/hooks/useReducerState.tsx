import { useEffect } from 'react';
import { useState, useCallback } from 'react';

interface InputReducerType<T> {
  state: T;
  onChangeInput: (_event: object) => void;
}

export function useInputReducerState<T>(
  model: T | null | undefined,
): InputReducerType<T> {
  const [state, setState] = useState<T | null | undefined>(model);

  const onChangeInput = useCallback(event => {
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
    console.log('effect', { model, state })
    if (Object.keys(state).length > 0) {
      return;
    }

    setState(model);
  }, [model, state]);

  return { state, onChangeInput };
}
