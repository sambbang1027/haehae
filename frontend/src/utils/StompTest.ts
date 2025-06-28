import { useState, useRef, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import { TextEncoder, TextDecoder } from 'fast-text-encoding';

interface UseWebSocketProps {
    accessToken: string;
}


if (typeof global.TextEncoder === 'undefined') {
global.TextEncoder = TextEncoder as unknown as typeof global.TextEncoder;}
if (typeof global.TextDecoder === 'undefined') {
global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}
export const useSTOMPTest = ({ accessToken }: UseWebSocketProps) => {
    const [connected, setIsConnected] = useState(false);

    useEffect(() => {
    if (!accessToken) {
        setIsConnected(false);
        return;
    }
    console.log("STOMP TEST : "+accessToken);
    const client = new Client({
    webSocketFactory: () => {
        console.log("WebSocket 생성됨, 서브프로토콜 포함해서 연결 시도");
        return new WebSocket("ws://10.0.2.2:8082/ws");
    },
    connectHeaders: { 
        Authorization: `Bearer ${accessToken}`
     },
    debug: (msg) => console.log("[STOMP DEBUG]", msg),
    reconnectDelay: 5000,
    forceBinaryWSFrames : true,
    appendMissingNULLonIncoming : true,
    onConnect: () => {
        console.log("✅ STOMP 연결 성공!");
    },
    onStompError: (frame) => {
        console.error("❌ STOMP ERROR", frame.headers['message']);
    },
    onWebSocketError: (event) => {
        console.error("🌐 웹소켓 오류", event);
    }
    });


    client.activate();

    return () => {
        client.deactivate();
    };
    }, [accessToken]);
};
