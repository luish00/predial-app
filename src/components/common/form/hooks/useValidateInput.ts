import { useCallback, useState } from 'react';
import { isNumber, log, validateEmail } from '../../../../utilities/utils';
import { useFormContext } from '../form.context';

export interface ValidationsProps {
  key: string;
  requerid?: boolean;
  keyName?: string;
  isEmail?: boolean;
  onlyNumber?: boolean;
  minLength?: number;
}

const useValidateInput = (validations: ValidationsProps[], state: object) => {
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const {
    formFunctions: { onNextFocus },
    formState,
  } = useFormContext();

  const validateForm = useCallback(() => {
    let isValid = false;
    setFormErrors([]);

    try {
      for (let item of validations) {
        const { key, keyName } = item;
        const newState: { [key: string]: boolean } = {
          ...formState.focusPocus,
          [key]: true,
        };

        if (!state) {
          isValid = false;
          continue;
        }

        if (item.requerid) {
          const requerid = !!state[key];

          if (!requerid) {
            isValid = false;

            setFormErrors(prev => [
              ...prev,
              `* ${keyName || key} es requerido.`,
            ]);
            onNextFocus(newState);
          }
        }

        if (item.isEmail) {
          const email: string = state[key];
          const isEmailValid = validateEmail(email);

          if (!isEmailValid) {
            isValid = false;

            setFormErrors(prev => [
              ...prev,
              `* ${keyName || key}, formato invalido.`,
            ]);
          }
        }

        if (item.onlyNumber && !isNumber(state[key])) {
          isValid = false;

          setFormErrors(prev => [
            ...prev,
            `* ${keyName || key}, formato invalido.`,
          ]);
        }

        if (
          item.minLength &&
          item.minLength > 0 &&
          String(state[key]).length < item.minLength
        ) {
          isValid = false;

          setFormErrors(prev => [
            ...prev,
            `* ${keyName || key}, tamaño mínimo de ${item.minLength}.`,
          ]);
        }
      }
    } catch (error) {
      isValid = false;
      log('validateForm error', error.message);
    }

    return isValid;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return { validateForm, formErrors };
};

export { useValidateInput };
