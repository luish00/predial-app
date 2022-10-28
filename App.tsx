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

import { AppNavitation } from './src/navigations/AppNavitation';
import { AuthProvider } from './src/contexts/useAuthContext.js';

const userToken = false;

const App = () => {
  return (
    <AuthProvider>
      <AppNavitation userToken={userToken} />
    </AuthProvider>
  );
};

export default App;
