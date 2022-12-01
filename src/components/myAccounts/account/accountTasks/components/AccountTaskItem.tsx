import React from 'react';
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { TaskProp } from '../../../../../types';

import { Label } from '../../../../common/grids';

interface Props {
  item: TaskProp;
  onPress?: (item: TaskProp) => void;
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
      <Label fontWeight="bold" fontSize={20}>
        {`Entrega ${getTitle(item?.Id || 0)} carta invitación`}
      </Label>

      <Label fontSize={16}>{item.LastModifiedDate?.split('T')[0]}</Label>

      <Label fontSize={16}>
        {item.IsComplete ? 'Completado' : 'Por notificar'}
      </Label>
    </View>
  </TouchableNativeFeedback>
);

export { AccountTaskItem };
