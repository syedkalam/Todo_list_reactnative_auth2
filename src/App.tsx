import React from 'react';
import {StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './redux/store';

import TodoScreen from './screens/todoScreen/TodoScreen';

const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 30,
  },
});

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <SafeAreaProvider style={appStyles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <TodoScreen />
      </SafeAreaProvider>
    </Provider>
  );
}

export default App;
