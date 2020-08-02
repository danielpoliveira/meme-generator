import 'react-native-gesture-handler';

import React from 'react';
import { StatusBar } from 'react-native';


import Routes from './src/routes';

export default () => {
  return (
    <>
      <StatusBar translucent backgroundColor="rgba(0, 0, 0, 0.20)" />
      <Routes />
    </>
  );
}