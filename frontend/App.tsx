import 'react-native-reanimated';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextSizeProvider } from './src/context/TextSizeContext'
import { ModalProvider } from './src/context/ModalContext';
import ModalHost from './src/components/modal/HostModal';
import Footer from './src/components/layouts/Footer';
import { ToastProvider } from './src/context/ToastContext';
import AppNavigator from './src/navigation/AppNavigator';
import CommunityNavigator from './src/navigation/CommunityNavigator';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

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
                      {/* <AppNavigator /> */}
                      <CommunityNavigator></CommunityNavigator>
                      <ModalHost />
                      <Footer />
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
