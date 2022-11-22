import React, { useCallback, useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { useAccountContext } from '../../../../contexts/useAccountContext';
import { ContactProp } from '../../../../types';
import { FabButton } from '../../../common/buttons/FabButton';
import { ListEmpty } from '../../../common/lists';
import { ListSeparator } from '../../../common/lists/ListSeparator';
import { useCreateContact } from '../../services/useAccountService';
import { AccountListHeader } from '../common/AccountListHeader';
import { ContactListItem } from './components/ContactListItem';
import { ContactModal } from './components/ContactModal';

const newContact: ContactProp = {
  Id: '',
  IsOwner: false,
  Relationship: '',
  FirstName: '',
  AccountId: '',
};

const AccountContactsScreen: React.FC = () => {
  const {
    accountState: { account, contacts },
    accountFunctions: { addContact, updateAccount },
  } = useAccountContext();
  const [visible, setVisible] = useState(false);
  const [isNewContact, setIsNewContact] = useState(false);
  const [contactModal, setContactModal] = useState<ContactProp>(newContact);

  const { createContact, isLoading, errors, contact, resetAccountService } =
    useCreateContact();

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
      createContact(item);
    },
    [createContact],
  );

  const onAddContact = useCallback(() => {
    setContactModal(newContact);
    setIsNewContact(true);
    setVisible(true);
  }, []);

  useEffect(() => {
    if (visible && account?.Id) {
      resetAccountService();
      setContactModal((prev: ContactProp) => ({
        ...prev,
        AccountId: account?.Id,
      }));
    }
  }, [account, visible]);

  useEffect(() => {
    if (!contact) {
      return;
    }

    const action = isNewContact ? addContact : updateAccount;
    action(contact);
    setVisible(false);
  }, [addContact, contact, isNewContact, updateAccount]);

  return (
    <>
      <FlatList
        data={contacts}
        keyExtractor={(_, index) => String(index)}
        ListHeaderComponent={AccountListHeader}
        ListEmptyComponent={ListEmpty}
        renderItem={({ item }) => (
          <ContactListItem onItemPress={onItemPress} item={item} />
        )}
        ItemSeparatorComponent={ListSeparator}
      />

      {visible && (
        <ContactModal
          errors={errors}
          isLoading={isLoading}
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
