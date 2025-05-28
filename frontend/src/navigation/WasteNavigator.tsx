import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BulkWasteApplyScreen from '../screens/waste/BulkWasteApplyScreen';
import WasteApplyWebViewScreen from '../screens/waste/WasteApplyWebViewScreen';
import WasteRestrictionGuideScreen from '../screens/waste/WasteRestrictionGuideScreen';

export type WasteStackParamList = {
  BulkWasteApplyScreen: undefined;
  WasteApplyWebViewScreen: { url: string };
  WasteRestrictionGuideScreen: undefined;
};

const Stack = createNativeStackNavigator<WasteStackParamList>();

const WasteNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="BulkWasteApplyScreen">
      <Stack.Screen
        name="BulkWasteApplyScreen"
        component={BulkWasteApplyScreen}
        options={({ navigation }) => ({
          headerTitle: '대형폐기물 신청',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="WasteApplyWebViewScreen"
        component={WasteApplyWebViewScreen}
        options={({ navigation }) => ({
          headerTitle: '신청 페이지',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="WasteRestrictionGuideScreen"
        component={WasteRestrictionGuideScreen}
        options={({ navigation }) => ({
          headerTitle: '배출 제한 가이드',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default WasteNavigator;
