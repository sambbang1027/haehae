import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RecycleCalendar from './src/screens/RecycleCalendar';
import MainScreen from './src/screens/MainScreen';
import MissionScreen from './src/screens/MissionScreen';
import Alarm from './src/screens/Alarm';
import RewardList from './src/screens/RewardList';
import RewardDetail from './src/screens/RewardDetail';

const Stack = createStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MissionScreen" 
            component={MissionScreen}
            options={{ title: '미션 목록' }} // MissionScreen의 타이틀 설정 (선택 사항)
          />
          <Stack.Screen
            name='RecycleCalendar'
            component={RecycleCalendar}
            options={{  headerShown: false  }}
          />
          <Stack.Screen
            name='Alarm'
            component={Alarm}
            options={{title: '알람 목록'}}
            />
            <Stack.Screen
              name='RewardList'
              component={RewardList}
              options={{title : '리워드 상점 '}}
            />
            <Stack.Screen
              name="RewardDetail"
              component={RewardDetail}
              options={{title : '리워드 상점' }}
              />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;