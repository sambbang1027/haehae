import React from 'react';
import { WebView, WebViewNavigation } from 'react-native-webview';
import { View } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { WasteStackParamList } from '../../navigation/WasteNavigator'; // 너의 네비게이터 타입

type Props = NativeStackScreenProps<WasteStackParamList, 'WasteApplyWebViewScreen'>;

const WasteApplyWebViewScreen = ({ navigation, route }: Props) => {
  const { url } = route.params; // 여기에서 url 가져오기

  const handleNavigationChange = (navState: WebViewNavigation) => {
    const currentUrl = navState.url;

    if (currentUrl.includes('/complete')) {
      const params = new URLSearchParams(currentUrl.split('?')[1]);
      const applyId = params.get('applyId') ?? '';
      const date = params.get('date') ?? '';
      const items = decodeURIComponent(params.get('items') ?? '');
      const address = decodeURIComponent(params.get('address') ?? '');

      if (!applyId || !date || !items || !address) {
        console.warn('신청 정보 누락');
        return;
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        source={{ uri: url }}
        onNavigationStateChange={handleNavigationChange}
      />
    </View>
  );
};

export default WasteApplyWebViewScreen;