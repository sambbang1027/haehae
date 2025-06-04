// ───────────────────────────────────────────────────────────────────
// index.js 맨 위에 붙여야 합니다.
// 반드시 AppRegistry.registerComponent 이전이어야 하고, 다른 곳에는 이 코드를 두지 마세요.

import { LogBox } from 'react-native';

const originalWarn = console.warn;
const originalError = console.error;

console.warn = (msg, ...args) => {
  if (typeof msg === 'string' && msg.includes('Text strings must be rendered')) {
    console.log('📌 Text 오류 위치(WARN):', new Error().stack);
  }
  originalWarn(msg, ...args);
};

console.error = (msg, ...args) => {
  if (typeof msg === 'string' && msg.includes('Text strings must be rendered')) {
    console.log('📌 Text 오류 위치(ERROR):', new Error().stack);
  }
  // 에러는 그대로 콘솔에 출력해 주기 위해 originalError 사용
  originalError(msg, ...args);
};

// (워닝 자체를 숨기고 싶다면 아래 주석 해제)
// LogBox.ignoreLogs(['Warning: Text strings must be rendered within a <Text> component']);
// ───────────────────────────────────────────────────────────────────

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
