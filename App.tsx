import React from 'react';
import { Provider as StateProvider } from 'react-redux';
import { store, persistor } from './src/redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import 'react-native-get-random-values';
import 'react-native-gesture-handler';

import MainNavigation from './src/navigation/AppNavigator';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  return (
    <StateProvider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar />
        <MainNavigation/>
      </PersistGate>
    </StateProvider>
  );
};