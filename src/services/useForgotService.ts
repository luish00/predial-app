import { useCallback } from 'react';
import { useFetch } from '../hooks';

const useForgotService = () => {
  const { post } = useFetch();

  const forgotPassword = useCallback(
    async (email: string) => {
      const response = await post({
        path: 'user/forgot',
        body: { UserName: email },
      });

      return response.isValid;
    },
    [post],
  );

  return { forgotPassword };
};

export { useForgotService };
