import React from 'react';
import { Text, View } from 'react-native';
import { useRoute } from '@react-navigation/native';

export const TaskScreen = () => {
  const route = useRoute();
  const { task } = route?.params || {};

  console.log('task', task)

  return (
    <View>
      <Text>TaskScreen</Text>
    </View>
  );
};
