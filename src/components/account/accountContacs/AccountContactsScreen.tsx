import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useAccountContext } from '../../../contexts/useAccountContext';
import { ContactProp } from '../../../types';
import { ListEmpty } from '../../common/lists';
import { ListSeparator } from '../../common/lists/ListSeparator';
import { ContactListHeader } from './components/ContactListHeader';
import { ContactListItem } from './components/ContactListItem';
import { ContactModal } from './components/ContactModal';

const newContact: ContactProp = {};

const AccountContactsScreen: React.FC = () => {
  const {
    accountState: { contacts },
  } = useAccountContext();
  const [visible, setVisible] = useState(false);
  const [contactModal, setContactModal] = useState<ContactProp>(
    newContact,
  );

  const onDismissModal = React.useCallback(() => {
    setVisible(false);
    setContactModal(newContact);
  }, []);

  const onItemPress = useCallback((item: ContactProp) => {
    setVisible(true);
    setContactModal(item);
  }, []);

  return (
    <>
      <FlatList
        data={contacts}
        keyExtractor={(_, index) => String(index)}
        ListHeaderComponent={ContactListHeader}
        ListEmptyComponent={ListEmpty}
        renderItem={({ item }) => (
          <ContactListItem onItemPress={onItemPress} item={item} />
        )}
        ItemSeparatorComponent={ListSeparator}
      />

      <ContactModal
        item={contactModal}
        onDismiss={onDismissModal}
        visible={visible}
      />
    </>
  );
};

export { AccountContactsScreen };
