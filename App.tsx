import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
} from 'react-native';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? '#28231d' : '#fff'}
      />
      <Text style={styles.text}>DemoPosts</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc',
  },
  text: {
    fontSize: 40,
    color: '#fff',
  },
});

export default App;
