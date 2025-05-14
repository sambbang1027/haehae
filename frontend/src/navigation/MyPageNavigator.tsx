import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPage from '../screens/mypage/MyPage';
import SettingPage from '../screens/mypage/SettingPage';
import CheckPw from '../screens/mypage/CheckPwPage';
import EditUserInfo from '../screens/mypage/EditUserInfoPage';
import EditProfile from '../screens/mypage/EditProfilePage';
import LevelInfo from '../screens/mypage/LevelInfo';

// 네비게이션 스택 타입 정의
export type MyPageStackParamList = {
  MyPage: undefined;
  SettingPage: undefined;
  CheckPw: undefined;
  EditUserInfo: undefined;
  EditProfile: undefined;
  LevelInfo: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();

const MyPageNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
        options={{ title: '설정' }}
      />
      <Stack.Screen
        name="CheckPw"
        component={CheckPw}
        options={{ title: '회원정보 수정' }}
      />
      <Stack.Screen
        name="EditUserInfo"
        component={EditUserInfo}
        options={{ title: '회원정보 수정' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: '프로필 수정' }}
      />
      <Stack.Screen
        name="LevelInfo"
        component={LevelInfo}
        options={{ title: '등급' }}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
