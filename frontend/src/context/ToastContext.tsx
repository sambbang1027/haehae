import React, {
  createContext,
  useContext,
  useRef,
  useState,
  ReactNode,
} from 'react';
import { StyleSheet, Animated, Easing} from 'react-native';
import AppText from '../components/common/AppText';
import Video from 'react-native-video';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
      duration: 100,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();

    // fade out after delay
    setTimeout(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
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
    top: hp('40%'),
    left: wp('50%'),
    transform: [
      { translateX: -wp('30%') }, // 너비의 절반 만큼 왼쪽으로 이동
      { translateY: -hp('10%') }, // 토스트 높이 절반만큼 위로 이동
    ],
    width: wp('60%'),
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    zIndex: 999,
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontSize: wp('5%'),
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  video: {
    width: wp('15%'),
    height: wp('15%'),
    marginVertical: hp('2%'),
  },
});
