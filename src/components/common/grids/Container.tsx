import React from 'react';
import { ScrollView, ViewStyle, View } from 'react-native';

interface Props {
  children: React.ReactNode;
  style?: ViewStyle;
}

const Container: React.FC<Props> = ({ children, style }) => {
  return (
    <ScrollView>
      <View style={style}>{children}</View>
    </ScrollView>
  );
};

export { Container };
