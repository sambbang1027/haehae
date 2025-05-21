import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TestMenuScreen from './TestMenuScreen';
import RecycleCalendarScreen from '../screens/calendar/RecycleCalendarScreen';
import BulkWasteApplyScreen from '../screens/waste/BulkWasteApplyScreen';
import WasteRestrictionGuideScreen from '../screens/waste/WasteRestrictionGuideScreen';
import CollectionBoxLocationScreen from '../screens/location/CollectionBoxLocationScreen';
import PloggingPlaceScreen from '../screens/location/PloggingPlaceScreen';
import AiDisposalEntryScreen from '../screens/aidisposal/AiDisposalEntryScreen'
import AiDisposalLoadingScreen from '../screens/aidisposal/AiDisposalLoadingScreen'
import AiDisposalResultScreen from '../screens/aidisposal/AiDisposalResultScreen';

import { RootStackParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function TestStack() {
  return (
    <Stack.Navigator initialRouteName="TestMenu">
      <Stack.Screen name="TestMenu" component={TestMenuScreen} />
      <Stack.Screen name="RecycleCalendar" component={RecycleCalendarScreen} />
      <Stack.Screen name="BulkWasteApply" component={BulkWasteApplyScreen} />
      <Stack.Screen name="WasteRestrictionGuide" component={WasteRestrictionGuideScreen} />
      <Stack.Screen name="CollectionBoxLocation" component={CollectionBoxLocationScreen} />
      <Stack.Screen name="PloggingPlace" component={PloggingPlaceScreen} />

      <Stack.Screen name="AiDisposalEntry" component={AiDisposalEntryScreen} />
      <Stack.Screen name="AiDisposalLoading" component={AiDisposalLoadingScreen} />
      <Stack.Screen name="AiDisposalResult" component={AiDisposalResultScreen} />

    </Stack.Navigator>
  );
}
