import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import CommunityNavigator from './src/navigation/CommunityNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <BottomSheetModalProvider>
            <CommunityNavigator />
          </BottomSheetModalProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
