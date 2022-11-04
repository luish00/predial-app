import React from 'react';
import { Text, View } from 'react-native';
import { useAccountContext } from '../../../contexts/useAccountContext';

const AccountDetailsScreen: React.FC = () => {
  const { accountState } = useAccountContext();
  console.log('state', accountState);

  return (
    <View>
      <Text>AccountDetailsScreen</Text>
    </View>
  );
};

export { AccountDetailsScreen };
