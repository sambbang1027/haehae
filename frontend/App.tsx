import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import RecycleCalendar from './src/screens/RecycleCalendar';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <RecycleCalendar />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
