import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    marginBottom: 50,
  },
});

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Container: React.FC<Props> = ({ children, style }) => {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={style}>{children}</View>
    </ScrollView>
  );
};

export { Container };
