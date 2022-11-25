import React, { useCallback, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import { NavigationPropBase, TaskProp } from '../../../../types';

import { ListSeparator } from '../../../common/lists/ListSeparator';
import { AccountListHeader } from '../common/AccountListHeader';
import { AccountTaskItem } from './components';
import { FabButton } from '../../../common/buttons/FabButton';
import { useAccountContext } from '../../../../contexts/useAccountContext';
import { useGetTaskService } from './services/useTaskServices';
import { ModalBase } from '../../../common/modals';

const AccountTasksScreen: React.FC<NavigationPropBase> = ({ navigation }) => {
  const {
    accountState: { account },
  } = useAccountContext();

  const { getTasks, isLoading, result } = useGetTaskService(account?.Id);

  const onPress = React.useCallback(
    (item: TaskProp) => {
      navigation?.navigate('taskScreen', { task: item });
    },
    [navigation],
  );

  const onNewTask = useCallback(() => {
    navigation?.navigate('taskScreen', {
      task: { AccountId: account?.Id },
    });
  }, [account?.Id, navigation]);

  useEffect(() => {
    console.log('mount');
  }, []);

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
