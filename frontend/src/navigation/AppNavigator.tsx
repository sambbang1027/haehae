import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';

import LoginNavigator, { LoginStackParamList } from './LoginNavigator';
import MyPageNavigator, { MyPageStackParamList } from './MyPageNavigator';
import CommunityNavigator, { CommuntiyStackParamList } from './CommunityNavigator';

import Category from '../components/layouts/Category';
import TestMenuScreen from './TestMenuScreen'; // 테스트용 추가
import RootLayout from '../components/layouts/FooterLayout'; // Footer 포함된 레이아웃

// 전체 스택 타입 정의
export type AppStackParamList = {
  category: undefined;
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
  TestMenu: undefined;
  TestStack: undefined;
  CommunityStack: NavigatorScreenParams<CommuntiyStackParamList>;
};

// 스택 생성
const Stack = createNativeStackNavigator<AppStackParamList>();

// 내보낼 네비게이터
const AppNavigator = () => {
  return (
    <>
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
          options={{ headerShown: false }}
        />      
      </Stack.Navigator>

      {/* <RootLayout /> */}
    </>
  );
};

export default AppNavigator;
