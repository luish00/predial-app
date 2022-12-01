/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';

import { store } from './src/redux/store';

import { AppNavigation } from './src/navigations/AppNavigation';
import { AuthProvider } from './src/contexts/useAuthContext';

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <AppNavigation />

        <Toast />
      </AuthProvider>
    </Provider>
  );
};

export default App;
