import React from 'react';
import { Text, View } from 'react-native';
import { HomeTabChildrenProps } from '../home/homeTab';

interface Props extends HomeTabChildrenProps { }

const MyRoutesScreen: React.FC<Props> = ({ accounts, homeNavigation }) => {
  return (
    <View>
      <Text>MyRoutesScreen</Text>
    </View>
  );
};

export { MyRoutesScreen };
