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
import { AuthProvider } from './src/contexts/useAuthContext';

const App = () => {
  return (
    <AuthProvider>
      <AppNavitation />
    </AuthProvider>
  );
};

export default App;
