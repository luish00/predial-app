import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  ViewStyle,
  View,
} from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const Container: React.FC<Props> = ({ children, style }) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="height" style={[styles.container, style]}>
        <View>{children}</View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export { Container };
