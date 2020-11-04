import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View,  StatusBar } from 'react-native';
import Routes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" translucent={true} backgroundColor={'transparent'} />
      <AppProvider>
        <View style={{ flex: 1, backgroundColor: '#312E38' }} >
          <Routes />
        </View>
      </AppProvider>
    </NavigationContainer>
  );
};

export default App;