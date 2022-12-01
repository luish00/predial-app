import React, { useCallback } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { NavigationPropBase, TaskProp } from '../../../../types';

import { ListSeparator } from '../../../common/lists/ListSeparator';
import { AccountListHeader } from '../common/AccountListHeader';
import { AccountTaskItem } from './components';
import { FabButton } from '../../../common/buttons/FabButton';
import { useGetTaskService } from './services/useTaskServices';
import { useAppSelector } from '../../../../hooks';

const AccountTasksScreen: React.FC<NavigationPropBase> = ({ navigation }) => {
  const store = useAppSelector(state => state.accountDetails);
  const account = store.accountDetails;
  const { getTasks, isLoading, result } = useGetTaskService(account?.Id);

  const onPress = React.useCallback(
    (item: TaskProp) => {
      navigation?.navigate('addTaskScreen', { task: item });
    },
    [navigation],
  );

  const onNewTask = useCallback(() => {
    navigation?.navigate('addTaskScreen', {
      task: { AccountId: account?.Id },
    });
  }, [account?.Id, navigation]);

  return (
    <>
      <FlatList
        ItemSeparatorComponent={ListSeparator}
        data={result?.data || []}
        ListHeaderComponent={AccountListHeader}
        renderItem={({ item }) => (
          <AccountTaskItem item={item} onPress={onPress} />
        )}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={getTasks} />
        }
        keyExtractor={(_, index) => String(index)}
      />

      <FabButton onPress={onNewTask} />
    </>
  );
};

export { AccountTasksScreen };
