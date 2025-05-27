import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TouchableOpacity, Text } from 'react-native';

import AiDisposalEntryScreen from '../screens/aidisposal/AiDisposalEntryScreen';
import AiDisposalLoadingScreen from '../screens/aidisposal/AiDisposalLoadingScreen';
import AiDisposalResultScreen from '../screens/aidisposal/AiDisposalResultScreen';

export type AiDisposalParamList = {
  AiDisposalEntryScreen: undefined;
  AiDisposalLoadingScreen: undefined;
  AiDisposalResultScreen: undefined;
};

const Stack = createNativeStackNavigator<AiDisposalParamList>();

const AiDisposalNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="AiDisposalEntryScreen">
      <Stack.Screen
        name="AiDisposalEntryScreen"
        component={AiDisposalEntryScreen}
        options={({ navigation }) => ({
          headerTitle: 'AI 분리배출',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AiDisposalLoadingScreen"
        component={AiDisposalLoadingScreen}
        options={({ navigation }) => ({
          headerTitle: '분석 중...',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="AiDisposalResultScreen"
        component={AiDisposalResultScreen}
        options={({ navigation }) => ({
          headerTitle: '결과 안내',
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

export default AiDisposalNavigator;
