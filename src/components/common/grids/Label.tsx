import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import colors from '../../../colors';

interface Props {
  children: string;
  style?: TextStyle;
  fontSize?: number;
  color?: string;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
}

const styles = StyleSheet.create({
  text: { color: colors.textPriary, fontSize: 16 },
});

const Label: React.FC<Props> = ({
  children,
  color,
  fontSize,
  textAlign,
  style,
}) => {
  return (
    <Text style={[styles.text, style, { color, fontSize, textAlign }]}>
      {children}
    </Text>
  );
};

export { Label };
