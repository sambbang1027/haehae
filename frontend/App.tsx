import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TestMenuScreen from './src/screens/TestMenuScreen';
import RecycleCalendarScreen from './src/screens/RecycleCalendarScreen';
import BulkWasteApplyScreen from './src/screens/BulkWasteApplyScreen';
import WasteApplyWebViewScreen from './src/screens/WasteApplyWebViewScreen';
import WasteRestrictionGuideScreen from './src/screens/WasteRestrictionGuideScreen';
import CollectionBoxLocationScreen from './src/screens/CollectionBoxLocationScreen';
import PloggingPlaceScreen from './src/screens/PloggingPlaceScreen';
import type { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TestMenu">
        <Stack.Screen name="TestMenu" component={TestMenuScreen} options={{ title: '테스트 메뉴' }} />
        <Stack.Screen name="RecycleCalendar" component={RecycleCalendarScreen} options={{ title: '분리수거 캘린더' }} />
        <Stack.Screen name="BulkWasteApply" component={BulkWasteApplyScreen} options={{ title: '폐기물 신청' }} />
        <Stack.Screen name="WasteApplyWebViewScreen" component={WasteApplyWebViewScreen} />
        <Stack.Screen name="WasteRestrictionGuide" component={WasteRestrictionGuideScreen} options={{ title: '폐기물 처리 가이드' }}/>
        <Stack.Screen name="CollectionBoxLocation" component={CollectionBoxLocationScreen} options={{ title: '수거함 위치'}} />
        <Stack.Screen name="PloggingPlace" component={PloggingPlaceScreen} options={{ title: '플로깅 장소'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;