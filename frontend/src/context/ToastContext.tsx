import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { StyleSheet, Dimensions, Animated, Easing} from 'react-native';
import AppText from '../components/common/AppText';
import Video from 'react-native-video';

const { width, height } = Dimensions.get('window');

type ToastOptions = {
  message: string;
  video?: any; // require(...) 형태로 넘겨받음
};

type ToastState = ToastOptions & {
  visible: boolean;
};

const ToastContext = createContext<{
  showToast: (options: ToastOptions) => void;
}>({
  showToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: '',
    video: undefined,
  });

  const opacity = useRef(new Animated.Value(0)).current;

  const showToast = ({ message, video }: ToastOptions) => {
    setToast({ visible: true, message, video });

    // fade in
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // fade out after delay
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setToast({ visible: false, message: '', video: undefined });
      });
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast View */}
      {toast.visible && (
        <Animated.View style={[styles.toast, { opacity }]}>
          <Video
            source={require('../assets/images/toast.mp4')} 
            style={styles.video}
            repeat       // 무한 반복
            muted        // 음소거
            resizeMode="contain" 
            paused={false} // 자동 재생
          />
          <AppText style={styles.text}>{toast.message}</AppText>
        </Animated.View>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: height / 2,
    left: width / 2,
    transform: [
      { translateX: -(width * 0.6)/2 }, 
      { translateY: -90 }, // 대충 토스트 높이 절반 추정
    ],
    width: width * 0.6,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 20,
    zIndex: 999,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  video: {
    width: 80,
    height: 80,
    marginVertical: 20,
  },
});
