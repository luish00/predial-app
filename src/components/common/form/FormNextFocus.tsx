import React from 'react';

import { useTextInputNext } from '../../../hooks';
import { FormProvider, useFormContext } from './form.context';

interface Props {
  children: React.ReactNode;
  inputKeys?: string[];
}

const FormNextFocus: React.FC<Props> = ({ children, inputKeys }) => {
  return (
    <FormProvider>
      <FormNextFocusBase inputKeys={inputKeys}>{children}</FormNextFocusBase>
    </FormProvider>
  );
};

type ObjCompareType = { [k: string]: boolean };

function compare(obj1: ObjCompareType, obj2: ObjCompareType) {
  if (!obj1 || !obj1) {
    return false;
  }

  let diff = false;

  Object.keys(obj1).forEach(key => {
    const equal = obj1[key] !== obj2[key];

    if (equal) {
      diff = true;
    }
  });

  return diff;
}

const FormNextFocusBase: React.FC<Props> = ({ children, inputKeys }) => {
  const {
    formFunctions: { init, onNextFocus },
  } = useFormContext();

  const { onSubmitEditing, focusPocus } = useTextInputNext(inputKeys || []);
  const [oldState, setOldState] = React.useState<ObjCompareType>(focusPocus);

  React.useEffect(() => {
    init({ focusPocus, onSubmitEditing });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    const stateChanged = compare(oldState, focusPocus);

    if (!stateChanged) {
      return;
    }

    setOldState(focusPocus);
    onNextFocus(focusPocus);
  }, [oldState, focusPocus, onNextFocus]);

  console.log('render 5')

  return <>{children}</>;
};

export { FormNextFocus };
