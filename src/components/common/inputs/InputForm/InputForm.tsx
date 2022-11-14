import React from 'react';
import { useFormContext } from '../../form/form.context';

import { InputProps } from '../input';
import { InputWithImage } from '../InputWithImage/InputWithImage';

export const InputForm: React.FC<InputProps> = ({
  image,
  keyboardType = 'default',
  label,
  minLength,
  nativeID,
  onChangeText,
  required,
  returnKeyType = 'default',
  value = '',
  ...rest
}) => {
  const {
    formState: { focusPocus, onSubmitEditing },
  } = useFormContext();

  const isFocus = React.useMemo(() => {
    const valueFocus = focusPocus && focusPocus[nativeID];

    return valueFocus || false;
  }, [focusPocus, nativeID]);

  // const handleOnSubmitEditing = React.useCallback((event: any) => {
  //   //   console.log('update', onSubmitEditing);

  //   if (onSubmitEditing) {
  //     onSubmitEditing(event);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [onSubmitEditing]);

  return (
    <InputWithImage
      {...rest}
      focus={isFocus}
      image={image}
      keyboardType={keyboardType}
      label={label}
      minLength={minLength}
      nativeID={nativeID}
      onChangeText={onChangeText}
      onSubmitEditing={onSubmitEditing}
      required={required}
      returnKeyType={returnKeyType}
      value={value}
    />
  );
};
