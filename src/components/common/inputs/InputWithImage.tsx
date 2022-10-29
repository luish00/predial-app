import React from 'react';
import {
  ImageSourcePropType,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputTextInputEventData,
  View,
  TextInputProps,
} from 'react-native';
import colors from '../../../colors';
import { ImageIcon } from '../ImageIcon';

import { Label } from '../grids/Label';
import { Row } from '../Row';

interface Props {
  image?: ImageSourcePropType;
  keyboardType?: KeyboardTypeOptions | undefined;
  label: string;
  onChange?: (event: NativeSyntheticEvent<TextInputTextInputEventData>) => {};
  value: string;
  secureTextEntry?: boolean;
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
  imageContainer: {
    borderBottomColor: colors.secondaryDark,
    borderBottomWidth: 2,
  },
});

const InputWithImage: React.FC<Props> = ({
  image,
  keyboardType = 'default',
  label,
  onChange,
  value,
  secureTextEntry = false,
}) => {
  return (
    <View style={styles.container}>
      <Label>{label}</Label>

      <Row style={styles.inputContainer}>
        <TextInput
          keyboardType={keyboardType}
          onTextInput={onChange}
          value={value}
          style={styles.input}
          secureTextEntry={secureTextEntry}
        />

        <View style={styles.imageContainer}>
          <ImageIcon source={image} width={30} height={30} />
        </View>
      </Row>
    </View>
  );
};

export { InputWithImage };
