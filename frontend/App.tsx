import 'react-native-reanimated';
import React from 'react';

import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextSizeProvider } from './src/context/TextSizeContext'
import { ModalProvider } from './src/context/ModalContext';
import ModalHost from './src/components/modal/HostModal';
import { ToastProvider } from './src/context/ToastContext';
import AppNavigator from './src/navigation/AppNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import FooterLayout from './src/components/layouts/FooterLayout';

import TestApiScreen from './src/screens/TestApiScreen';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TextSizeProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <ToastProvider>
              <ModalProvider>
                <NavigationContainer>
                    <BottomSheetModalProvider>
                      <AppNavigator />
                      <ModalHost />
                      <FooterLayout />
                    </BottomSheetModalProvider>
                </NavigationContainer>
              </ModalProvider>
            </ToastProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </TextSizeProvider>
    </GestureHandlerRootView>
  );
}
