import { useCallback, useEffect, useState } from 'react';
import { useApiGet } from '../../../hooks';
import { AccountsGetResponse, ContactAccountResponse } from '../../../models';

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
  const { get, isLoading, result } = useApiGet<ContactAccountResponse[]>(
    `account/${id}`,
  );

  useEffect(() => {
    if (!id) {
      return;
    }

    get({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { contacts: result, isLoading };
};
