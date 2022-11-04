import React, { useState } from 'react';
import {
  ImageSourcePropType,
  KeyboardTypeOptions,
  TextInput,
  ReturnKeyTypeOptions,
  TextInputProps,
  View,
  Text,
} from 'react-native';

import { ImageIcon } from '../../images/ImageIcon';

import { Label } from '../../grids/Label';
import { Row } from '../../Row';

import styles from './InputWithImage.style';
import { validateEmail } from '../../../../utilities/utils';
import colors from '../../../../colors';

interface Props extends TextInputProps {
  autoFocus?: boolean;
  image?: ImageSourcePropType;
  keyboardType?: KeyboardTypeOptions | undefined;
  label: string;
  onChangeText?:
    | React.Dispatch<React.SetStateAction<string>>
    | ((value: string) => void);
  placeholder?: string;
  required?: boolean;
  returnKeyType: ReturnKeyTypeOptions;
  secureTextEntry?: boolean;
  value?: string;
}

const InputWithImage: React.FC<Props> = ({
  autoFocus = false,
  image,
  keyboardType = 'default',
  label,
  required,
  onChangeText,
  value = '',
  ...rest
}) => {
  const [error, setError] = useState(false);
  const [messageError, setMessageError] = useState('');

  const handleBlur = React.useCallback(() => {
    if (!required) {
      return;
    }

    let validations = !value || value?.trim().length === 0;
    let message = validations ? 'Requerido' : '';

    if (keyboardType === 'email-address') {
      validations = validations || !validateEmail(value);
      message = validations ? 'Formato de email incorrecto' : message;
    }

    setError(validations);
    setMessageError(message);
  }, [keyboardType, required, value]);

  const handleFocus = React.useCallback(() => {
    setError(false);
  }, []);

  return (
    <View style={styles.container}>
      <Label>{label}</Label>

      <Row style={styles.inputContainer}>
        <TextInput
          autoFocus={autoFocus}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          style={[styles.input, error && styles.inputError]}
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
