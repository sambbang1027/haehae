import 'react-native-reanimated';
import React from 'react';

import { NavigationContainer, useNavigationContainerRef } from '@react-navigation/native';
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
import { navigationRef } from './src/navigation/NavigationService';
import { UserProvider } from './src/context/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export default function App() {
  
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
      <TextSizeProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <ToastProvider>
              <ModalProvider>
                <UserProvider>
                  <NavigationContainer ref={navigationRef}>
                      <BottomSheetModalProvider>
                        <AppNavigator />
                        <ModalHost />
                        <FooterLayout  navigationRef={navigationRef}/>
                      </BottomSheetModalProvider>
                  </NavigationContainer>
                </UserProvider>
              </ModalProvider>
            </ToastProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </TextSizeProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
