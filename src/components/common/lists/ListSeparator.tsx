import React from 'react';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#222',
    height: 1,
  },
});

export const ListSeparator: React.FC = () => <View style={styles.separator} />;
