import 'react-native-reanimated';
import React, {useState} from 'react';
import { NavigationContainer,useNavigationContainerRef } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import { TextSizeProvider } from './src/context/TextSizeContext';
import { ModalProvider } from './src/context/ModalContext';
import ModalHost from './src/components/modal/HostModal';
import Footer from './src/components/layouts/Footer';
import { ToastProvider } from './src/context/ToastContext';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import AppNavigator from './src/navigation/AppNavigator';



export default function App() {

  const navigationRef = useNavigationContainerRef();
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <TextSizeProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <ToastProvider>
              <ModalProvider>
                  <NavigationContainer
                  ref={navigationRef}
                  onReady={() => {
                    setCurrentRoute(navigationRef.getCurrentRoute()?.name);
                  }}
                  onStateChange={() => {
                    setCurrentRoute(navigationRef.getCurrentRoute()?.name);
                  }}
                >
                  <BottomSheetModalProvider>
                    <AppNavigator />
                    {!['RewardDetail'].includes(currentRoute || '') && (
                      <Footer />
                    )}
                    <ModalHost />
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
