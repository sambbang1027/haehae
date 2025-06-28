import { RxStomp } from '@stomp/rx-stomp';
import { useEffect, useState, useRef } from 'react'; // useRef 추가

interface UseWebSocketProps {
    accessToken: string;
}

export function useRxStomp({ accessToken }: UseWebSocketProps) {
    const [connected, setConnected] = useState(false);
    // useRef를 사용하여 RxStomp 인스턴스를 컴포넌트 생애주기 동안 유지
    const rxStompRef = useRef<RxStomp | null>(null);

    useEffect(() => {
        // accessToken이 없으면 연결 시도하지 않음
        if (!accessToken) {
            if (rxStompRef.current) {
                console.log('🧹 cleanup: accessToken 없음, 기존 rxStomp 비활성화');
                rxStompRef.current.deactivate();
                rxStompRef.current = null;
                setConnected(false);
            }
            return;
        }

        // 인스턴스가 없으면 새로 생성
        if (!rxStompRef.current) {
            console.log('✨ 새로운 RxStomp 인스턴스 생성');
            rxStompRef.current = new RxStomp();
        }

        const currentRxStomp = rxStompRef.current;


        currentRxStomp.configure({
            brokerURL: `ws://172.30.72.92:8082/ws?token=${accessToken}`, // IP 주소 확인!
            connectHeaders: {
                Authorization: `Bearer ${accessToken}`,
            },
            debug: (msg) => console.log('[RX-STOMP]', msg),
            reconnectDelay: 5000,
        });



            currentRxStomp.activate();



        // connected$ 구독은 매번 새로 생성하여 최신 상태를 반영
        const sub = currentRxStomp.connected$.subscribe(() => {
            console.log('✅ STOMP 연결 성공');
            setConnected(true);
        });

        const msgSub = currentRxStomp.watch('/topic/queue').subscribe((message) => {
            console.log('📩 메시지 수신:', message.body);
        });

        // 컴포넌트 언마운트 또는 useEffect 재실행 시 클린업
        return () => {
            console.log('🧹 cleanup: RxStomp 구독 해제 및 비활성화');
            msgSub.unsubscribe();
            sub.unsubscribe();
            setConnected(false);
        };
    }, [accessToken]); // accessToken에만 의존

    return { connected, rxStomp: rxStompRef.current }; // 필요하다면 rxStomp 인스턴스도 반환
}