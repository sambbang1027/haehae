import { useEffect, useRef, useState, useCallback } from 'react';
import { Client, StompHeaders } from '@stomp/stompjs';
// React Native의 기본 WebSocket 객체를 가져옵니다.
// react-native-websocket 라이브러리가 설치되어 있다면 이 WebSocket을 사용합니다.
// npm install react-native-websocket
// yarn add react-native-websocket
import RNWebSocket from 'react-native-websocket';

interface WebSocketConfig {
  accessToken: string;
  onMessage: (msg: any) => void;
  brokerURL?: string; // WebSocket 서버 URL, 기본값 제공 가능
  debug?: boolean; // 디버그 로그 활성화 여부
  reconnectDelay?: number; // 재연결 딜레이
}

interface WebSocketControls {
  sendMessage: (destination: string, body: any) => void;
  disconnect: () => void;
  isConnected: boolean;
  stompClient: Client | null; // stompClient 인스턴스를 외부에 노출 (필요 시)
}

export const useWebSocket = ({
  accessToken,
  onMessage,
  brokerURL = 'ws://10.0.2.2:8082/ws', // 기본값 설정
  debug = true,
  reconnectDelay = 5000,
}: WebSocketConfig): WebSocketControls => {
  const stompClientRef = useRef<Client | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // onMessage 콜백이 변경되어도 WebSocket 연결이 재설정되지 않도록 useCallback 사용
  const handleMessage = useCallback((message: any) => {
    try {
      const msg = JSON.parse(message.body);
      onMessage(msg);
    } catch (e) {
      console.error('❌ 메시지 파싱 에러 형님!!!', e);
    }
  }, [onMessage]);

  useEffect(() => {
    // 액세스 토큰이 없으면 연결 시도하지 않음
    if (!accessToken) {
      console.warn("Access token not provided. WebSocket connection will not be established.");
      if (stompClientRef.current) {
        stompClientRef.current.deactivate(); // 기존 연결이 있다면 해제
        setIsConnected(false);
      }
      return;
    }

    console.log("🪪 accessToken:", accessToken ? '****' : '없음'); // 토큰 값 직접 노출 방지

    // 기존 클라이언트 인스턴스가 있다면 비활성화하고 정리
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.deactivate();
      console.log('🔄 기존 STOMP 연결 종료 및 재연결 시도');
    }

    stompClientRef.current = new Client({
      // `react-native-websocket`의 WebSocket 인스턴스를 생성하여 전달
      // 초기 HTTP 핸드셰이크에 Authorization 헤더 포함
      webSocketFactory: () => {
        return new RNWebSocket(brokerURL, [], {
          headers: {
            'Authorization': `Bearer ${accessToken}`, // ✅ HTTP 핸드셰이크 헤더
          },
        });
      },

      // STOMP CONNECT 프레임에 포함될 헤더 (서버의 StompChannelInterceptor용)
      connectHeaders: {
        Authorization: `Bearer ${accessToken}`, // ✅ STOMP CONNECT 프레임 헤더
      } as StompHeaders, // StompHeaders 타입 명시

      debug: debug ? (str) => console.log('🧪 DEBUG:', str) : undefined, // 디버그 여부
      reconnectDelay: reconnectDelay,
      heartbeatIncoming: 0, // 서버에서 하트비트를 보내지 않는다면 0으로 설정하거나 적절히 조절
      heartbeatOutgoing: 0, // 클라이언트에서 하트비트를 보내지 않는다면 0으로 설정하거나 적절히 조절

      onConnect: () => {
        console.log('✅ STOMP 연결 성공 형님!!!');
        setIsConnected(true);

        // STOMP 구독 설정
        stompClientRef.current?.subscribe('/user/queue/messages', handleMessage);
        // 필요하다면 다른 구독도 추가
        // stompClientRef.current?.subscribe('/topic/public-chat', handleMessage);
      },
      onStompError: (frame) => {
        console.error('❌ STOMP 에러 발생 형님!!!', frame);
        setIsConnected(false);
      },
      onWebSocketError: (error) => {
        console.error('🧨 WebSocket 자체 에러 형님!!!', error);
        setIsConnected(false);
      },
      onDisconnect: () => {
        console.log('🔌 STOMP 연결 종료 형님!!! (onDisconnect)');
        setIsConnected(false);
      },
    });

    console.log("🧨 클라이언트 activate 실행 전 형님!!!");
    stompClientRef.current.activate(); // STOMP 클라이언트 활성화 시작

    // 클린업 함수: 컴포넌트 언마운트 시 WebSocket 연결 종료
    return () => {
      if (stompClientRef.current && stompClientRef.current.connected) {
        stompClientRef.current.deactivate();
        console.log('🔌 STOMP 연결 종료 형님!!! (클린업)');
      }
    };
  }, [accessToken, brokerURL, debug, reconnectDelay, handleMessage]); // 의존성 배열

  // 메시지 전송 함수
  const sendMessage = useCallback((destination: string, body: any) => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.publish({
        destination,
        body: JSON.stringify(body),
        headers: { 'content-type': 'application/json' }, // JSON 바디임을 명시
      });
      console.log(`✉️ 메시지 전송: ${destination}, ${JSON.stringify(body)}`);
    } else {
      console.warn('⚠️ WebSocket이 연결되지 않아 메시지를 보낼 수 없습니다.');
    }
  }, []);

  // 연결 종료 함수 (외부에서 수동 호출 가능)
  const disconnect = useCallback(() => {
    if (stompClientRef.current && stompClientRef.current.connected) {
      stompClientRef.current.deactivate();
      console.log('🔌 STOMP 연결 종료 형님!!! (수동 종료)');
    }
  }, []);

  return { sendMessage, disconnect, isConnected, stompClient: stompClientRef.current };
};
