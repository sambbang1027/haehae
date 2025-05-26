import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';

import LoginNavigator from './LoginNavigator';
import Category from '../components/layouts/Category';
import MyPageNavigator from './MyPageNavigator';
import CommunityNavigator from './CommunityNavigator';
<<<<<<< HEAD
=======
import AiDisposalNavigator from './AiDisposalNavigator';
import RecycleCalendarNavigator from './RecycleCalendarNavigator';
import LocationNavigator from './LocationNavigator';
import WasteNavigator from './WasteNavigator';


import { LoginStackParamList } from './LoginNavigator';
import { MyPageStackParamList } from './MyPageNavigator';
import { CommuntiyStackParamList } from './CommunityNavigator';
import { AiDisposalParamList } from './AiDisposalNavigator';
import { RecycleCalendarStackParamList } from './RecycleCalendarNavigator';
import { LocationStackParamList } from './LocationNavigator';
import { WasteStackParamList } from './WasteNavigator';
>>>>>>> 8aceb85 ([FEAT] : Navigator 구조화 및 적용)


export type AppStackParamList = {
  category: undefined;
<<<<<<< HEAD
  LoginStack: undefined;
  MyPageStack: undefined;
  TestMenu: undefined; // 테스트용 추가
  TestStack: undefined;
  CommunityStack: undefined;
};
=======

  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
  CommunityStack: NavigatorScreenParams<CommuntiyStackParamList>;

  AiDisposalStack: NavigatorScreenParams<AiDisposalParamList>;
  RecycleCalendarStack: NavigatorScreenParams<RecycleCalendarStackParamList>;
  LocationStack: NavigatorScreenParams<LocationStackParamList>;
  WasteStack: NavigatorScreenParams<WasteStackParamList>;

  VolunteerClass: undefined;
  PointRecord: undefined;
  DayWeekMission: undefined;

}
>>>>>>> 8aceb85 ([FEAT] : Navigator 구조화 및 적용)

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LoginStack"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
    <Stack.Screen 
      name="category"
      component={Category}
      options={({ navigation }) => ({
        title: '카테고리',
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
          </TouchableOpacity>
        ),
      })}
    />
      <Stack.Screen 
        name="LoginStack"
        component={LoginNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="MyPageStack"
        component={MyPageNavigator}
        options={{ headerShown: false }}
      />      
<<<<<<< HEAD
      <Stack.Screen 
        name="TestMenu"
        component={TestMenuScreen}
        options={{ headerShown: false }}

=======
>>>>>>> 8aceb85 ([FEAT] : Navigator 구조화 및 적용)
      <Stack.Screen
        name="CommunityStack"
        component={CommunityNavigator}
      />

      <Stack.Screen
        name='AiDisposalStack'
        component={AiDisposalNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='RecycleCalendarStack'
        component={RecycleCalendarNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='LocationStack'
        component={LocationNavigator}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='WasteStack'
        component={WasteNavigator}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
