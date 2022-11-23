import { useCallback, useEffect, useState } from 'react';
import { useApiGet, useFetch } from '../../../hooks';
import {
  AccountsGetResponse,
  ContactAccountResponse,
  CreateContactPayload,
} from '../../../models';
import { AccountDetailsProp, ContactProp } from '../../../types';

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

export const useGetAccountContacts = (id = '') => {
  const [contacts, setContacts] = useState<ContactProp[]>([]);

  const { get, isLoading, result } =
    useApiGet<ContactAccountResponse[]>('contact');

  useEffect(() => {
    if (isLoading || !result?.isValid || !result.data) {
      return;
    }

    setContacts(
      result.data.map(item => ({
        AccountId: item.AccountId,
        Email: item.Email,
        FirstName: item.FirstName,
        Id: item.Id,
        IsOwner: item.IsOwner,
        LastName: item.LastName,
        MiddleName: item.MiddleName,
        Mobile: item.Mobile,
        Name: item.Name,
        Phone: item.Phone,
        Relationship: item.Relationship,
      })),
    );
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
  const [contact, setContact] = useState<ContactProp | null>();
  const [errors, setErrors] = useState<string[]>([]);

  const { post, put } = useFetch<ContactAccountResponse>();

  const createOrUpdateContact = useCallback(
    (body: CreateContactPayload) => {
      const request = async () => {
        setLoading(true);
        setErrors([]);

        const isNew = !!body.Id;
        const path = isNew ? `contact/${body.Id}` : 'contact';
        const action = isNew ? put : post;

        const response = await action({ path, body });

        if (response.isValid && response.data) {
          const { data } = response;

          setContact({
            AccountId: data.AccountId,
            Email: data.Email,
            FirstName: data.FirstName,
            Id: parseInt(data.Id, 2),
            IsOwner: data.IsOwner,
            LastName: data.LastName,
            MiddleName: data.MiddleName,
            Mobile: data.Mobile,
            Name: data.Name,
            Phone: data.Phone,
            Relationship: data.Relationship,
          });
        } else {
          const responseError = response.errors?.map(item => item.msg);

          setErrors(responseError);
        }

        setLoading(false);
      };

      request();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const resetAccountService = useCallback(() => {
    setErrors([]);
    setLoading(false);
    setContact(null);
  }, []);

  return {
    contact,
    createOrUpdateContact,
    errors,
    isLoading,
    resetAccountService,
  };
};

export const useUpdateAccount = (id: number) => {
  const { put } = useFetch();

  const updateAccount = useCallback(
    async (body: AccountDetailsProp) => {
      const response = await put({ path: `account/${id}`, body });

      return response.isValid;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [id],
  );

  return { updateAccount };
};
