import React from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types'; // Stack Navigator 타입 정의

type Props = NativeStackScreenProps<RootStackParamList, 'WasteApplyWebViewScreen'>;

const WasteApplyWebViewScreen = ({ navigation } : Props) => {
  const handleNavigationChange = (navState : WebViewNavigation) => {
    const url = navState.url;

    if (url.includes('/complete')) {
      const params = new URLSearchParams(url.split('?')[1]);
      const applyId = params.get('applyId') ?? '';
      const date = params.get('date') ?? '';
      const items = decodeURIComponent(params.get('items') ?? '');
      const address = decodeURIComponent(params.get('address') ?? '');

      // ✅ 누락된 정보 방지 로직
      if (!applyId || !date || !items || !address) {
      console.warn('신청 정보 누락');
      return;
      }
        
      navigation.replace('QrResultScreen', {
        applyId,
        date,
        items,
        address,
      });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: 'https://gunpo-largewaste.kr/apply' }}
        onNavigationStateChange={handleNavigationChange}
      />
    </View>
  );
};

export default WasteApplyWebViewScreen;