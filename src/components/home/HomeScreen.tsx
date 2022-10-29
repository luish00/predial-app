import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

const HomeScreen: React.FC<PropsWithChildren> = () => {
  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  );
};

export const StackName: string = 'Home';

export { HomeScreen };
