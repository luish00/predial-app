import React from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 30,
  },
});

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Container: React.FC<Props> = ({ children, style }) => {
  return (
    <ScrollView>
      <View style={[styles.scrollView, style]}>{children}</View>
    </ScrollView>
  );
};

export { Container };
