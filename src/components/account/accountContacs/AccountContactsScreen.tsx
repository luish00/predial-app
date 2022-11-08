import React, { useCallback, useState } from 'react';
import { FlatList } from 'react-native';
import { useAccountContext } from '../../../contexts/useAccountContext';
import { ContactProp } from '../../../types';
import { FabButton } from '../../common/buttons/FabButton';
import { ListEmpty } from '../../common/lists';
import { ListSeparator } from '../../common/lists/ListSeparator';
import { ContactListHeader } from './components/ContactListHeader';
import { ContactListItem } from './components/ContactListItem';
import { ContactModal } from './components/ContactModal';

const newContact: ContactProp = {};

const AccountContactsScreen: React.FC = () => {
  const {
    accountState: { contacts },
    accountFunctions: { addContact, updateAccount },
  } = useAccountContext();
  const [visible, setVisible] = useState(false);
  const [isNewContact, setIsNewContact] = useState(false);
  const [contactModal, setContactModal] = useState<ContactProp>(newContact);

  const onDismissModal = React.useCallback(() => {
    setVisible(false);
    setContactModal(newContact);
  }, []);

  const onItemPress = useCallback((item: ContactProp) => {
    setContactModal(item);
    setIsNewContact(false);
    setVisible(true);
  }, []);

  const onSaveContact = useCallback(
    (item: ContactProp) => {
      const action = isNewContact ? addContact : updateAccount;

      action(item);
      setVisible(false);
    },
    [addContact, isNewContact, updateAccount],
  );

  const onAddContact = useCallback(() => {
    setContactModal(newContact);
    setIsNewContact(true);
    setVisible(true);
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

      {visible && (
        <ContactModal
          isNewContact={isNewContact}
          item={contactModal}
          onDismiss={onDismissModal}
          onSave={onSaveContact}
          visible={true}
        />
      )}

      <FabButton onPress={onAddContact} />
    </>
  );
};

export { AccountContactsScreen };
