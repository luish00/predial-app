import { useEffect } from 'react';
import { useState, useCallback } from 'react';

interface InputReducerType<T> {
  state: T;
  onChangeInput: (_event: object) => void;
  setItemState: (key: string, value: string | any) => void;
  updateState: (state: T) => void;
}

export function useInputReducerState<T>(
  model: T | null | undefined,
): InputReducerType<T> {
  const [state, setState] = useState<T | null | undefined>(model);

  const onChangeInput = useCallback((event: any) => {
    const {
      nativeEvent: { text },
      _dispatchInstances: { memoizedProps },
    } = event;

    const { nativeID } = memoizedProps;

    if (nativeID) {
      setState(prev => (prev ? { ...prev, [nativeID]: text } : prev));
    }
  }, []);

  const setItemState = useCallback((key: string, value: string | any) => {
    setState(prev => (prev ? { ...prev, [key]: value } : prev));
  }, []);

  const updateState = useCallback((newState: T) => {
    setState(prev => ({ ...prev, ...newState }));
  }, []);

  useEffect(() => {
    setState(model);
  }, [model]);

  return { onChangeInput, setItemState, updateState, state };
}
