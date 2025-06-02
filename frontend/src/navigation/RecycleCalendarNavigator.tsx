import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import RecycleCalendarScreen from '../screens/calendar/RecycleCalendarScreen';
import { TouchableOpacity, Text } from 'react-native';
export type RecycleCalendarStackParamList = {
  RecycleCalendarScreen: undefined;
};

const Stack = createNativeStackNavigator<RecycleCalendarStackParamList>();

const RecycleCalendarNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='RecycleCalendarScreen'>
            <Stack.Screen
                name='RecycleCalendarScreen'
                component={RecycleCalendarScreen}
                options={({ navigation }) => ({
                    title : '분리수거 캘린더',
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

export default RecycleCalendarNavigator;