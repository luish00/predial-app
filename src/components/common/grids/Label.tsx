import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import colors from '../../../colors';

interface Props {
  children: string | null | undefined;
  style?: TextStyle;
  fontSize?: number;
  fontWeight?:
    | 'normal'
    | 'bold'
    | '100'
    | '200'
    | '300'
    | '400'
    | '500'
    | '600'
    | '700'
    | '800'
    | '900'
    | undefined;
  color?: string;
  selectable?: boolean;
  textAlign?: 'auto' | 'left' | 'right' | 'center' | 'justify' | undefined;
}

const styles = StyleSheet.create({
  text: { color: colors.textPrimary, fontSize: 16 },
});

const Label: React.FC<Props> = ({
  children,
  color = colors.textPrimary,
  fontSize,
  fontWeight,
  selectable,
  style,
  textAlign,
}) => {
  return (
    <Text
      selectable={selectable}
      style={[styles.text, style, { color, fontSize, fontWeight, textAlign }]}>
      {children}
    </Text>
  );
};

export { Label };
