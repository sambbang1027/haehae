import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { TouchableOpacity, Text } from 'react-native';
import LoginNavigator from './LoginNavigator';
import Category from '../components/layouts/Category';
import MyPageNavigator from './MyPageNavigator';
import { LoginStackParamList } from './LoginNavigator';
import { MyPageStackParamList } from './MyPageNavigator';
import { CommuntiyStackParamList } from './CommunityNavigator';

import TestMenuScreen from './TestMenuScreen';
import CommunityNavigator from './CommunityNavigator';
import MainNavigator from './MainNavigator';
import ChatList from '../screens/chat/ChatList'; 




export type AppStackParamList = {
  category: undefined;
  LoginStack: NavigatorScreenParams<LoginStackParamList>;
  MyPageStack: NavigatorScreenParams<MyPageStackParamList>;
  TestMenu: undefined; // 테스트용 추가
  TestStack: undefined;
  CommunityStack: NavigatorScreenParams<CommuntiyStackParamList>;
  MainStack : undefined;
  chat: undefined;

};

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MainStack"
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
        name="MainStack"
        component={MainNavigator}
        options ={{headerShown : false}}
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
        {/* <Stack.Screen
        name="chat"
        component={ChatList}
        options={({ navigation }) => ({
          title: '채팅',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
            </TouchableOpacity>
          ),
          headerRight: () => (
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 18, marginRight: 10 }}>나가기</Text>
          </TouchableOpacity>
        )
        })}
      /> 도훈이 chatList UI */}  
    </Stack.Navigator>
  );
};

export default AppNavigator;
