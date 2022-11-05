import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly'
    | undefined;
}

const styles = StyleSheet.create({
  row: { display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' },
});

const Row: React.FC<Props> = ({
  children,
  style,
  justifyContent = 'flex-start',
}) => <View style={[styles.row, { justifyContent }, style]}>{children}</View>;

export { Row };
