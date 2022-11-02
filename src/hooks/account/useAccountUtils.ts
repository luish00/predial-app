import { useMemo } from 'react';
import { AccountDetailsProp } from '../../types';

const useAccountUtils = (account: AccountDetailsProp) => {
  const fullAccountName = useMemo(() => {
    const value = [account.FirstName, account.MiddleName, account.LastName];

    return value.filter(item => !!item).join(' ');
  }, [account]);

  const fullAccountAddress = useMemo(() => {
    const value = [
      account.Street,
      account.State,
      account.City,
      account.PostalCode,
    ];

    return value.filter(item => !!item).join(', ');
  }, [account]);

  return { fullAccountName, fullAccountAddress };
};

export { useAccountUtils };
