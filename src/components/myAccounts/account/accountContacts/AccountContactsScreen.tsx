import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';

import {
  addContact,
  updateAccount,
} from '../../../../redux/slices/accountDetailsSlice';
import { useAppDispatch, useAppSelector } from '../../../../hooks';
import { ContactProp } from '../../../../types';

import { useCreateContact, useGetAccountContacts, useGetAccounts } from '../../../../services';

import { FabButton } from '../../../common/buttons/FabButton';
import { ListEmpty } from '../../../common/lists';
import { ListSeparator } from '../../../common/lists/ListSeparator';
import { AccountListHeader } from '../common/AccountListHeader';
import { ContactListItem } from './components/ContactListItem';
import { ContactNewModal } from './components/ContactNewModal';

const newContact: ContactProp = {
  Id: '',
  IsOwner: false,
  Relationship: '',
  FirstName: '',
  AccountId: '',
};

const AccountContactsScreen: React.FC = () => {
  const store = useAppSelector(state => state.accountDetails);
  const { accountDetails, contacts } = store;
  const dispatch = useAppDispatch();

  const [visible, setVisible] = useState(false);
  const [isNewContact, setIsNewContact] = useState(false);
  const [contactModal, setContactModal] = useState<ContactProp>(newContact);

  const {
    createOrUpdateContact,
    isLoading,
    errors,
    contact,
    resetAccountService,
  } = useCreateContact();

  const { isRefreshing, onRreshContacts} = useGetAccountContacts({
    id: accountDetails?.Id ? String(accountDetails.Id) : '',
    autoLoad: false,
  });

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
      createOrUpdateContact(item);
    },
    [createOrUpdateContact],
  );

  const onAddContact = useCallback(() => {
    setContactModal(newContact);
    setIsNewContact(true);
    setVisible(true);
  }, []);

  const onRefresh = useCallback(() => {
    if (isLoading) {
      return;
    }

    onRreshContacts();
  }, [isLoading, onRreshContacts]);

  useEffect(() => {
    if (visible && accountDetails?.Id) {
      resetAccountService();
      setContactModal((prev: ContactProp) => ({
        ...prev,
        AccountId: accountDetails?.Id,
      }));
    }
  }, [accountDetails, resetAccountService, visible]);

  useEffect(() => {
    if (!contact) {
      return;
    }

    const action = isNewContact ? addContact : updateAccount;
    dispatch(action(contact));
    setVisible(false);
  }, [contact, dispatch, isNewContact]);

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
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        ItemSeparatorComponent={ListSeparator}
      />

      {visible && (
        <ContactNewModal
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
