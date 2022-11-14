import React, { useCallback, useState } from 'react';

interface FocusModelProp {
  key: string;
  focus: boolean;
}

const useCreateInputFocusModel = (keys: string[]) => {
  const keysMemo = React.useMemo(
    () => keys.map(key => ({ key, focus: false })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return keysMemo;
};

export const useTextInputNext = (keys: string[]) => {
  const model = useCreateInputFocusModel(keys);
  const [inputFocus, setInputFocus] = useState<FocusModelProp[]>(model);

  const focusPocus: { [k: string]: boolean } = React.useMemo(() => {
    let focus: { [k: string]: boolean } = {};

    inputFocus.forEach(itemInput => {
      focus[itemInput.key] = !!inputFocus.find(
        item => item.key === itemInput.key,
      )?.focus;
    });

    return focus;
  }, [inputFocus]);

  const onSubmitEditing = useCallback((event: any) => {
    const {
      _dispatchInstances: { memoizedProps },
    } = event;
    const { nativeID } = memoizedProps;

    setInputFocus((prev: FocusModelProp[]) => {
      const nextFocusIndex = keys.findIndex(item => item === nativeID) + 1;

      return prev.map((item: FocusModelProp) => ({
        ...item,
        focus: item.key === keys[nextFocusIndex],
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { onSubmitEditing, focusPocus };
};
