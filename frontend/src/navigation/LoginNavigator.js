import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../screens/login/LoginPage'; 
import SignupPage from '../screens/login/SignupPage';
import FindIdPage from '../screens/login/FindIdPage';
import FindPwPage from '../screens/login/FindPwPage';
import SetPwPage from '../screens/login/SetPwPage';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login"
       screenOptions={{
        headerTitleAlign: 'center', 
    }}
    >
      <Stack.Screen
        name='Login'
        component={LoginPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='Signup'
        component={SignupPage}
        options={{ title: '회원가입' }}         
      />
      <Stack.Screen
        name='FindId'
        component={FindIdPage}
        options={{title: '아이디 찾기'}}
      />
      <Stack.Screen
        name='FindPw'
        component={FindPwPage}
        options={{title: '비밀번호 찾기'}}
      />
      <Stack.Screen 
        name='SetPw'
        component={SetPwPage}
        options={{title: '비밀번호 재설정'}}
      />
    

    </Stack.Navigator>
  );
};

export default LoginNavigator;
