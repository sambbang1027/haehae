import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import LoginNavigator from './LoginNavigator';
import Category from '../components/layouts/Category';
import MyPageNavigator from './MyPageNavigator';
import { LoginStackParamList } from './LoginNavigator';
import { MyPageStackParamList } from './MyPageNavigator';
import CommunityNavigator from './CommunityNavigator';
import {CommuntiyStackParamList} from './CommunityNavigator'

import TestMenuScreen from './TestMenuScreen';  // 테스트용 추가

export type AppStackParamList = {
  category: undefined;
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
  TestMenu: undefined; // 테스트용 추가
  TestStack: undefined;
  CommunityStack: NavigatorScreenParams<CommuntiyStackParamList>;
};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPageStack"
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
      <Stack.Screen 
        name="TestMenu"
        component={TestMenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CommunityStack"
        component={CommunityNavigator}
      />      
    </Stack.Navigator>
  );
};

export default AppNavigator;
