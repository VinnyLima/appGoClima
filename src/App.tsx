import React from 'react';
import {View, StatusBar} from 'react-native';

import Clima from './Pages/Clima';
import {NavigationContainer} from '@react-navigation/native';

const App: React.FC = () => (
  <NavigationContainer>
    <StatusBar barStyle="light-content" backgroundColor="#3399ff" />
    <View style={{flex: 1, backgroundColor: '#312e38'}}>
      <Clima />
    </View>
  </NavigationContainer>
);

export default App;
