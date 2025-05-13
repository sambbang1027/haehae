import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPage from '../screens/mypage/MyPage';
import SettingPage from "../screens/mypage/SettingPage";
import CheckPw from "../screens/mypage/CheckPw";
import EditUserInfo from "../screens/mypage/EditUserInfoPage";
const Stack = createNativeStackNavigator();

const MyPageNavigator = () =>{
    return (
        <Stack.Navigator initialRouteName="MyPage"
        screenOptions={{
            headerTitleAlign: 'center', 
          }}
        >
        <Stack.Screen 
            name='MyPage'
            component={MyPage}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name='SettingPage'
            component={SettingPage}
            options={{title : '설정'}}
        />
        <Stack.Screen 
            name='CheckPw'
            component={CheckPw}
            options={{title : '회원정보 수정'}}
        />
        <Stack.Screen 
            name='EditUserInfo'
            component={EditUserInfo}
            options={{title: '회원정보 수정'}}
        />

        
    </Stack.Navigator>
    );
};

export default MyPageNavigator;