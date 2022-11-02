import React from 'react';
import { Text, View } from 'react-native';
import { HomeTabChildernProps } from '../home/homeTab';

interface Props extends HomeTabChildernProps { }

const MyRoutesScreen: React.FC<Props> = ({ accounts, homeNavigation }) => {
  return (
    <View>
      <Text>MyRoutesScreen</Text>
    </View>
  );
};

export { MyRoutesScreen };
