import { Client } from '@stomp/stompjs';
import { TextEncoder, TextDecoder } from 'fast-text-encoding';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}

// ✅ 전역 클라이언트 변수
let stompClient: Client | null = null;

export const connectWebSocket = (
  accessToken: string,
  onMessage: (msg: any) => void
): Client | null => {
  if (!accessToken) {
    console.warn("❌ accessToken이 비어 있음. WebSocket 연결 중단 형님!!!");
    return null;
  }

  // 👉 이전 클라이언트 종료 처리
  if (stompClient?.active) {
    console.log("🔌 기존 STOMP 연결 종료 시도 형님!!!");
    stompClient.deactivate();
  }

  console.log("🧪 connectWebSocket 실행됨 - accessToken:", accessToken);

  stompClient = new Client({
    webSocketFactory: () => {
      const wsUrl = `ws://10.0.2.2:8082/ws?token=${encodeURIComponent(accessToken)}`;
      console.log("🌐 WebSocket 생성됨 -", wsUrl);
      return new WebSocket(wsUrl, ["v12.stomp"]);
    },
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
    debug: (str) => console.log("📡 [STOMP DEBUG]:", str),
    forceBinaryWSFrames: true,
    appendMissingNULLonIncoming: true,
    reconnectDelay: 5000, // ✅ 필요 시 자동 재연결

    onConnect: () => {
      console.log("✅ STOMP 연결 성공 형님!!!");

      // 👉 구독 로직
      stompClient?.subscribe("/user/queue/messages", (message) => {
        try {
          const parsed = JSON.parse(message.body);
          onMessage(parsed);
        } catch (err) {
          console.error("❌ 메시지 파싱 실패 형님!!!", err);
        }
      });
    },

    onStompError: (frame) => {
      console.error("❌ STOMP 프로토콜 에러 형님!!!", frame);
    },

    onWebSocketError: (event) => {
      console.error("❌ WebSocket 에러 발생 형님!!!", event);
    },
  });

  stompClient.activate();
  return stompClient;
};
