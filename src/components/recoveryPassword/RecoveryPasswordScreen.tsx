import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';

const RecoveryPasswordScreen: React.FC<PropsWithChildren> = () => {
  return (
    <View>
      <Text>Recovery Password</Text>
    </View>
  );
};

export const StackName: string = 'RecoveryPassword';

export { RecoveryPasswordScreen };
