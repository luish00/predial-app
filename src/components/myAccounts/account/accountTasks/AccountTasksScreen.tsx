import React from 'react';
import { FlatList } from 'react-native';

import { TASK_LIST } from '../../../../data_dummy/taskList';
import { TaskListProps } from '../../../../types';

import { ListSeparator } from '../../../common/lists/ListSeparator';
import { AccountListHeader } from '../common/AccountListHeader';
import { AccountTaskItem } from './components';
import { HomeTabNavigationProp } from '../../../home/homeTab';

const AccountTasksScreen: React.FC<HomeTabNavigationProp> = ({
  homeNavigation,
}) => {
  const onPress = React.useCallback(
    (item: TaskListProps) => {
      homeNavigation?.navigate('taskScreen', { task: item });
    },
    [homeNavigation],
  );

  return (
    <FlatList
      ItemSeparatorComponent={ListSeparator}
      data={TASK_LIST.reverse()}
      ListHeaderComponent={AccountListHeader}
      renderItem={({ item }) => (
        <AccountTaskItem item={item} onPress={onPress} />
      )}
      keyExtractor={(item: TaskListProps) => String(item.type)}
    />
  );
};

export { AccountTasksScreen };
