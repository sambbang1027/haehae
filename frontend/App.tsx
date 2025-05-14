
import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './src/types';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import MainScreen from './src/screens/MainScreen';
import MissionScreen from './src/screens/MissionScreen';
import Alarm from './src/screens/Alarm';
import RewardList from './src/screens/RewardList';
import RewardDetail from './src/screens/RewardDetail';
import TestMenuScreen from './src/screens/TestMenuScreen';
import RecycleCalendarScreen from './src/screens/RecycleCalendarScreen';
import BulkWasteApplyScreen from './src/screens/BulkWasteApplyScreen';
import WasteApplyWebViewScreen from './src/screens/WasteApplyWebViewScreen';
import WasteRestrictionGuideScreen from './src/screens/WasteRestrictionGuideScreen';
import CollectionBoxLocationScreen from './src/screens/CollectionBoxLocationScreen';
import PloggingPlaceScreen from './src/screens/PloggingPlaceScreen';


// const Stack = createStackNavigator();

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen}options={{ headerShown: false }} />
        <Stack.Screen name="MissionScreen" component={MissionScreen} options={{ title: '미션 목록' }}/> 
        <Stack.Screen name='Alarm' component={Alarm} options={{title: '알람 목록'}}/>
        <Stack.Screen name='RewardList' component={RewardList}options={{title : '리워드 상점 '}}/>
        <Stack.Screen name="RewardDetail"component={RewardDetail} options={{title : '리워드 상점' }}/>
        <Stack.Screen name="TestMenu" component={TestMenuScreen} options={{ title: '테스트 메뉴' }} />
        <Stack.Screen name="RecycleCalendar" component={RecycleCalendarScreen} options={{ title: '분리수거 캘린더' }} />
        <Stack.Screen name="BulkWasteApply" component={BulkWasteApplyScreen} options={{ title: '폐기물 신청' }} />
        <Stack.Screen name="WasteApplyWebViewScreen" component={WasteApplyWebViewScreen} />
        <Stack.Screen name="WasteRestrictionGuide" component={WasteRestrictionGuideScreen} options={{ title: '폐기물 처리 가이드' }}/>
        <Stack.Screen name="CollectionBoxLocation" component={CollectionBoxLocationScreen} options={{ title: '수거함 위치'}} />
        <Stack.Screen name="PloggingPlace" component={PloggingPlaceScreen} options={{ title: '플로깅 장소'}} />
      </Stack.Navigator>
    </NavigationContainer>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;