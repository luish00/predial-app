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
    setState(model);
  }, [model]);

  return { state, onChangeInput };
}
