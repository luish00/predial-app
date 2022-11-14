import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { TaskListProps } from '../../../../types';

import { Label } from '../../../common/grids';

interface Props {
  item: TaskListProps;
  onPress?: (item: TaskListProps) => void;
  disabled?: boolean;
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
});

const TITLES = ['primera', 'segunda', 'tercera'];

function getTitle(index: number) {
  const title = TITLES[index - 1];

  return title || '';
}

const AccountTaskItem: React.FC<Props> = ({
  disabled = false,
  item,
  onPress,
}) => (
  <TouchableNativeFeedback
    disabled={disabled}
    onPress={() => onPress && onPress(item)}>
    <View style={styles.container}>
      <Label fontWeight="bold" fontSize={20}>{`Entrega ${getTitle(
        item.type,
      )} carta invitación`}</Label>
      <Label fontSize={16}>{item.date}</Label>
      <Label fontSize={16}>
        {item.isComplete ? 'Completado' : 'Por notificar'}
      </Label>
    </View>
  </TouchableNativeFeedback>
);

export { AccountTaskItem };
