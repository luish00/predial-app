import React, { useState } from 'react';
import {
  ImageSourcePropType,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  SetStateAction,
  StyleSheet,
  TextInput,
  TextInputTextInputEventData,
  View,
} from 'react-native';
import colors from '../../../colors';
import { ImageIcon } from '../ImageIcon';

import { Label } from '../grids/Label';
import { Row } from '../Row';

interface Props {
  image?: ImageSourcePropType;
  keyboardType?: KeyboardTypeOptions | undefined;
  label: string;
  onChangeText?: React.Dispatch<React.SetStateAction<string>> | (() => void);
  placeholder?: string;
  secureTextEntry?: boolean;
  value: string;
  required?: boolean;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: 8,
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    borderBottomColor: colors.secondaryDark,
    borderBottomWidth: 2,
    flex: 1,
  },
  inputError: {
    borderBottomColor: colors.inputError,
  },
  imageContainer: {
    borderBottomColor: colors.secondaryDark,
    borderBottomWidth: 2,
  },
});

const InputWithImage: React.FC<Props> = ({
  image,
  keyboardType = 'default',
  label,
  onChangeText,
  placeholder,
  required,
  secureTextEntry = false,
  value,
}) => {
  const [error, setError] = useState<boolean>(false);
  const handleBlur = React.useCallback(() => {
    console.log('blur', value);
    if (!required) {
      return;
    }

    setError(!value || value?.trim().length === 0);
  }, [required, value]);

  const handleFocus = React.useCallback(() => {
    setError(false);
  }, []);

  return (
    <View style={styles.container}>
      <Label>{label}</Label>

      <Row style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          onBlur={handleBlur}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          style={[styles.input, error && styles.inputError]}
          value={value}
        />

        <View style={[styles.imageContainer, error && styles.inputError]}>
          <ImageIcon source={image} width={30} height={30} />
        </View>
      </Row>
    </View>
  );
};

export { InputWithImage };
