import React, { PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { useAuthContext } from '../../contexts/useAuthContext';
import { PrimaryButton } from '../common/buttons/PrimaryButton';

const HomeScreen: React.FC<PropsWithChildren> = () => {
  const {
    authFunctions: { signOut },
  } = useAuthContext();

  return (
    <View>
      <Text>HomeScreen</Text>
      <PrimaryButton onPress={signOut}>Log out</PrimaryButton>
    </View>
  );
};

export const StackName: string = 'Home';

export { HomeScreen };
