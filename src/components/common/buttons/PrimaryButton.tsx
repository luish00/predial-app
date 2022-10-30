import React from 'react';
import {
  ViewStyle,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import colors from '../../../colors';

interface Props {
  alignSelf?:
  | 'auto'
  | 'center'
  | 'flex-start'
  | 'flex-end'
  | 'stretch'
  | 'baseline';
  children: string;
  style?: ViewStyle;
  borderLess?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  size?: 'auto' | 'big' | 'mid' | 'small';
  textColor?: string;
}

const stylesPrimary = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    borderRadius: 8,
    height: 52,
    justifyContent: 'center',
    marginVertical: 1,
    paddingHorizontal: 8,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
});

const stylesBorderLess = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 52,
    justifyContent: 'center',
    marginVertical: 1,
    minWidth: 100,
    paddingHorizontal: 8,
  },
  text: {
    color: colors.primaryDark,
    fontSize: 20,
    fontWeight: 'bold',
  },
});

const sizes = { auto: 'auto', big: '100%', mid: '80%', small: '60%' };

const PrimaryButton: React.FC<Props> = ({
  alignSelf = 'auto',
  borderLess,
  children,
  disabled = false,
  onPress,
  style,
  size = 'auto',
  textColor,
}) => {
  const styles = borderLess ? stylesBorderLess : stylesPrimary;

  const customColor = React.useMemo(() => {
    if (!textColor) {
      return null;
    }

    return { color: textColor };
  }, [textColor]);

  return (
    <TouchableNativeFeedback onPress={onPress} disabled={disabled}>
      <View
        style={[
          styles.container,
          { alignSelf: alignSelf, width: sizes[size] },
          style,
        ]}>
        <Text style={[styles.text, customColor]}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export { PrimaryButton };
