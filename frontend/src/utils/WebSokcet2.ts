import { Client, IStompSocket  } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';


interface UseWebSocketProps {
    accessToken: string;
}

export const useWebSocket = ({ accessToken }: UseWebSocketProps) => {
    const clientRef = useRef<Client | null>(null);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        if (!accessToken) return;

       // const brokerUrl = ws://10.0.2.2:8082/ws?token=${accessToken};

        const stompClient = new Client({
          // brokerURL: brokerUrl,
            webSocketFactory: () => new WebSocket(`ws://10.0.2.2:8082/ws?token=${accessToken}`),
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            // protocols: ['v12.stomp'],
            debug: (msg) => {
                console.log('[STOMP DEBUG]', msg);
                if (msg.includes('CONNECT')) {
                console.log('👉 STOMP CONNECT 프레임 시도 중!');
                }
            },
            forceBinaryWSFrames: true,
            appendMissingNULLonIncoming: true,
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {
                console.log("✅:  Connected");
                setIsConnected(true);
                stompClient.subscribe('/topic/queue', (msg) => {
                console.log('📩 메시지 받음:', msg.body);
                });
            },
            onDisconnect: (frame) => {
                console.log('❌ STOMP 연결 끊김', frame);
                setIsConnected(false);
            },
            onStompError: (frame) => {
                console.error('💥 STOMP error:', frame);
            },
            onWebSocketError: (event) => {
                console.error('💥 WebSocket error:', event);
            },
        });

        
        clientRef.current = stompClient;
        
        

//         stompClient.webSocketFactory = () => {
//             return new WebSocket(
//                 `ws://10.0.2.2:8082/ws?token=${accessToken}`
//                 ,
//                 ['v12.stomp'] // 또는 ['v12.stomp']
//             ) as unknown as IStompSocket;
// };
        console.log("CONNECT  상태 : " + stompClient.state);
        stompClient.activate();
        
        setTimeout(() => console.log(stompClient), 1500)

        return () => {
            if (stompClient) {
                stompClient.deactivate();
                clientRef.current = null;
                setIsConnected(false);
            }
        };
    }, [accessToken]);

    return { isConnected };
};