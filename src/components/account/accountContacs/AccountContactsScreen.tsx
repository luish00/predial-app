import React from 'react';
import { FlatList } from 'react-native';
import { useAccountContext } from '../../../contexts/useAccountContext';
import { ListEmpty } from '../../common/lists';
import { ListSeparator } from '../../common/lists/ListSeparator';
import { ContactListHeader } from './components/ContactListHeader';
import { ContactListItem } from './components/ContactListItem';

const AccountContactsScreen: React.FC = () => {
  const {
    accountState: { contacts },
  } = useAccountContext();

  return (
    <FlatList
      data={contacts}
      keyExtractor={(_, index) => String(index)}
      ListHeaderComponent={ContactListHeader}
      ListEmptyComponent={ListEmpty}
      renderItem={({ item }) => <ContactListItem item={item} />}
      ItemSeparatorComponent={ListSeparator}
    />
  );
};

export { AccountContactsScreen };
