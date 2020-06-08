import React from 'react';
import { StatusBar } from 'react-native';
import MainNavigation from './src/navigation';
import Login from './src/screens/Autentikasi/Login';
import { Provider } from 'react-redux';
import store from './src/redux/configStore/store'


function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  )
}

export default App