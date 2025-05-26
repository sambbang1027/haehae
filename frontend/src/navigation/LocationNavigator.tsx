import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text, TouchableOpacity } from 'react-native';

import CollectionBoxLocationScreen from '../screens/location/CollectionBoxLocationScreen';
import PloggingPlaceScreen from '../screens/location/PloggingPlaceScreen';

export type LocationStackParamList = {
  CollectionBoxLocationScreen: undefined;
  PloggingPlaceScreen: undefined;
};

const Stack = createNativeStackNavigator<LocationStackParamList>();

const LocationNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="CollectionBoxLocationScreen">
      <Stack.Screen
        name="CollectionBoxLocationScreen"
        component={CollectionBoxLocationScreen}
        options={({ navigation }) => ({
          title: '수거함 위치',
          headerTitleAlign: 'center',
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={{ fontSize: 18, marginRight: 10 }}>✕</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PloggingPlaceScreen"
        component={PloggingPlaceScreen}
        options={({ navigation }) => ({
          title: '플로깅 장소',
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

export default LocationNavigator;