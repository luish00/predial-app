import { useCallback, useEffect, useState } from 'react';
import { useApiGet, useFetch } from '../../../hooks';
import { AccountsGetResponse, ContactAccountResponse, CreateContactPayload } from '../../../models';
import { ContactProp } from '../../../types';

export const useGetAccounts = () => {
  const [accounts, setAccounts] = useState<AccountsGetResponse[]>([]);

  const { get, isLoading, result } =
    useApiGet<AccountsGetResponse[]>('account');

  useEffect(() => {
    if (isLoading || !result?.isValid) {
      return;
    }

    if (result.data) {
      setAccounts(result.data);
    }
  }, [isLoading, result]);

  useEffect(() => {
    get({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshAccounts = useCallback(() => {
    get({});
  }, [get]);

  return { refreshAccounts, accounts, isLoadingAccount: isLoading };
};

export const useAccountContacts = (id = '') => {
  const [contacts, setContacts] = useState<ContactProp[]>([]);

  const { get, isLoading, result } =
    useApiGet<ContactAccountResponse[]>('contact');

  useEffect(() => {
    if (isLoading || !result?.isValid || !result.data) {
      return;
    }

    setContacts(result.data);
  }, [isLoading, result]);

  useEffect(() => {
    if (!id) {
      return;
    }

    get({ params: { accountId: id } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { contacts, isLoading };
};

export const useCreateContact = () => {
  const [isLoading, setLoading] = useState(false);
  const [contact, setContact] = useState<ContactProp>();
  const [errors, setErrors] = useState<string[]>([]);

  const { post } = useFetch<ContactAccountResponse>();

  const createContact = useCallback(
    async (newContact: CreateContactPayload) => {
      setLoading(true);
      setErrors([]);

      console.log('newContact', newContact)
      const response = await post({ path: 'contact', body: newContact });

      if (response.isValid && response.data) {
        setContact(response.data);
      } else {
        console.log('createContact', response);
        const responseError = response.errors?.map(item => item.msg);

        setErrors(responseError);
      }

      setLoading(false);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return { contact, createContact, errors, isLoading };
};
