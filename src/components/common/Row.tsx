import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  row: { display: 'flex', flexDirection: 'row' },
});

const Row: React.FC<Props> = ({ children, style }) => {
  return <View style={[styles.row, style]}>{children}</View>;
};

export { Row };
