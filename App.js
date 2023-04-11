import { SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import context from './src/context';

import Main from './src/Main';

export default function App() {
  return (
    <context.Provider value={{ theme: 'dark' }}>
      <SafeAreaView
        style={{ flex: 0, backgroundColor: '#eeeeee' }}
      ></SafeAreaView>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar />
        <NavigationContainer>
          <Main></Main>
        </NavigationContainer>
      </SafeAreaView>
    </context.Provider>
  );
}
