import React, { useRef, useState } from 'react';
import { TextInput, View } from 'react-native';

import { ImageIcon } from '../../images/ImageIcon';

import { Label } from '../../grids/Label';
import { Row } from '../../grids/Row';

import styles from './InputWithImage.style';
import { validateEmail } from '../../../../utilities/utils';
import colors from '../../../../colors';
import { InputProps } from '../input';

const InputWithImage: React.FC<InputProps> = ({
  focus,
  disabled = false,
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
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const refInput = useRef(null);

  const handleBlur = React.useCallback(() => {
    let validations = false;
    let message = '';

    if ((required || value.length) && minLength) {
      const minLengthValidation = minLength >= value.length;
      validations = validations || minLengthValidation;
      message = minLengthValidation ? `Tamaño mínimo ${minLength}` : message;
    }

    if ((required || value.length) && keyboardType === 'email-address') {
      validations = validations || !validateEmail(value);
      message = validations ? 'Formato de email incorrecto' : message;
    }

    if (required) {
      validations = !value || value?.trim().length === 0;
      message = validations ? 'Requerido' : '';
    }

    setError(validations);
    setMessageError(message);
  }, [keyboardType, minLength, required, value]);

  const handleFocus = React.useCallback(() => {
    setError(false);
    setMessageError('');
  }, []);

  React.useEffect(() => {
    if (!focus || !refInput) {
      return;
    }

    refInput.current?.focus();
  }, [focus, refInput]);

  return (
    <View style={styles.container}>
      <Label>{label}</Label>

      <Row style={styles.inputContainer}>
        <TextInput
          ref={refInput}
          keyboardType={keyboardType}
          nativeID={nativeID}
          editable={!disabled}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          returnKeyType={returnKeyType}
          style={[
            styles.input,
            // focus && styles.inputFocused,
            error && styles.inputError,
            disabled && styles.inputDisabled,
          ]}
          testID={nativeID}
          blurOnSubmit={returnKeyType !== 'next'}
          value={value}
          {...rest}
        />

        <View style={[styles.imageContainer, error && styles.inputError]}>
          <ImageIcon source={image} width={30} height={30} />
        </View>
      </Row>

      {messageError && <Label color={colors.inputError}>{messageError}</Label>}
    </View>
  );
};

export { InputWithImage };
