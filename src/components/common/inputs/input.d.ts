import {
  Dispatch,
  KeyboardTypeOptions,
  ReturnKeyTypeOptions,
  SetStateAction,
  TextInputProps,
} from 'react-native';

export interface InputProps extends TextInputProps {
  disabled?: boolean;
  focus?: boolean;
  image?: ImageSourcePropType;
  keyboardType?: KeyboardTypeOptions | undefined;
  label: string;
  minLength?: number;
  nativeID: string;
  onChangeText?: Dispatch<SetStateAction<string>> | ((value: string) => void);
  placeholder?: string;
  required?: boolean;
  returnKeyType: ReturnKeyTypeOptions | undefined;
  secureTextEntry?: boolean;
  value?: string;
}
