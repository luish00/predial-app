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

import { AppNavigation } from './src/navigations/AppNavigation';
import { AuthProvider } from './src/contexts/useAuthContext';

const App = () => {
  return (
    <AuthProvider>
      <AppNavigation />

      <Toast />
    </AuthProvider>
  );
};

export default App;
