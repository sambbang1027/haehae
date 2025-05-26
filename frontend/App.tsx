import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {

  return ( 
    <GestureHandlerRootView style={{ flex: 1 }}>
<<<<<<< HEAD
      <SafeAreaProvider>
        <NavigationContainer>
          <CommunityNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
=======
      <TextSizeProvider>
        <SafeAreaProvider>
          <PaperProvider>
            <ToastProvider>
              <ModalProvider>
                <NavigationContainer>
                    <BottomSheetModalProvider>
                      <AppNavigator />
                      <ModalHost />
                      <Footer />
                    </BottomSheetModalProvider>
                </NavigationContainer>
              </ModalProvider>
            </ToastProvider>
          </PaperProvider>
        </SafeAreaProvider>
      </TextSizeProvider>
>>>>>>> 8aceb85 ([FEAT] : Navigator 구조화 및 적용)
    </GestureHandlerRootView>
  );
}
