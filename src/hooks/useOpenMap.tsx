import { useCallback } from 'react';
import { Linking } from 'react-native';

const URL_MAP = 'https://www.google.com/maps/search/?api=1&query=';

export const useOpenMap = () => {
  const onOpenNavigationMap = useCallback((query: string) => {
    if (!query) {
      return;
    }

    console.log('query', query)

    const navigationUri = `google.ya:q=${query}`;
    const urlMap = `${URL_MAP}${query}`;

    return Linking.openURL(navigationUri).catch(() => {
      Linking.openURL(urlMap);
    });
  }, []);

  return { onOpenNavigationMap };
};
