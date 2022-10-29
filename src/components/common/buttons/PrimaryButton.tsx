import React from 'react';
import {
  ButtonProps,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import colors from '../../../colors';

interface Props {
  children: string;
  style?: ButtonProps;
  borderLess?: boolean;
  onPress: () => void;
}

const stylesPrimary = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.secondary,
    height: 52,
    justifyContent: 'center',
    marginVertical: 1,
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
  },
  text: {
    color: colors.primaryDark,
    fontSize: 20,
  },
});

const PrimaryButton: React.FC<Props> = ({
  children,
  style,
  borderLess,
  onPress,
}) => {
  const styles = borderLess ? stylesBorderLess : stylesPrimary;

  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export { PrimaryButton };
