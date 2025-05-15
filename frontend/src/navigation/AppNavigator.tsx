import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';
import LoginNavigator from './LoginNavigator';
import Category from '../components/layouts/Category';
import MyPageNavigator from './MyPageNavigator';
import CommunityNavigator from './CommunityNavigator';

export type AppStackParamList = {
  category: undefined;
  LoginStack: undefined;
  MyPageStack: undefined;
  CommunityStack: undefined;
};

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
      <Stack.Screen
        name="CommunityStack"
        component={CommunityNavigator}
      />      
    </Stack.Navigator>
  );
};

export default AppNavigator;
