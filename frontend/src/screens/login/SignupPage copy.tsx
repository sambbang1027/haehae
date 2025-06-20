import React, { useReducer, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import CustomCheckbox from '../../components/common/CustomCheckBox';
import dayjs from 'dayjs';
import { useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import EmailVerification from '../../components/login/EmailVerification';
import api from '../../api/AxiosInstance';
import { navigate } from '../../navigation/NavigationService';
import { useToast } from '../../context/ToastContext';

// 소셜 or 로컬 
type SignupParams = {
  params?: {
    loginType?: string;
  };
};

type State = {
  email: string;
  authCode: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  birth: Date;
  address: string;
  residenceType: string;
};

type Action = { type: 'SET_FIELD'; field: keyof State; value: any } | { type: 'RESET' };

const initialState: State = {
  email: '',
  authCode: '',
  password: '',
  confirmPassword: '',
  nickname: '',
  name: '',
  phoneNumber: '',
  birth: new Date(),
  address: '',
  residenceType: '',
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

const SignupPage= () => {
  const route = useRoute<RouteProp<SignupParams>>();
  const isSocial = route.params?.loginType === 'social';
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const {showToast} = useToast();


  const handleSignup = async() => {
    try{
      const payload = {
        ...state,
        birth: state.birth.toISOString().split('T')[0]
      };
      const url = isSocial ? '/user/register/social' : 'user/register/local';
      const response = await api.post(url, payload);
      if(response.status === 200){
        console.log('회원가입 성공 ', response.data);
        showToast({
          message: '회원가입 완료'
        });
        navigate('LoginStack', {screen: 'Login'});
      }
    }catch(error){
      console.error(error);
    }
  };

  // 인증번호 타이머 설정 
  const handleTimer = () => {
    if(intervalId){
      clearInterval(intervalId);
    }
    setTimer(300);
    const id = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(id);
          return 0;
        }
        return prev - 1;
      });
    },1000);
    setIntervalId(id);
  };

  // 비밀번호 패턴 검증
  const validatePassword = (password:string) => ({
    length: password.length >= 8 && password.length <= 12,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  });
  const pwRules = validatePassword(state.password);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoBox}>
        <Image 
          style={styles.logoImage}
          source={require('../../assets/images/logo.png')}
        />
      </View>

      {!isSocial && (
        <>
         <EmailVerification
            email={state.email}
            authCode={state.authCode}
            timer={timer}
            onEmailChange={(text) => dispatch({ type: 'SET_FIELD', field: 'email', value: text })}
            onCodeChange={(text) => dispatch({ type: 'SET_FIELD', field: 'authCode', value: text })}
            onSendCode={handleTimer}
            onVerifyCode={() => console.log('인증 확인')} 
          />

          <TextInput
            style={styles.input}
            placeholder="비밀번호 입력"
            secureTextEntry
            value={state.password}
            onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'password', value: text })}
          />
          <View style={styles.pwRuleBox}>
            <Text style={{ color: pwRules.length ? 'green' : 'gray' }}>• 8~12자</Text>
            <Text style={{ color: pwRules.hasLetter ? 'green' : 'gray' }}>• 영문 포함</Text>
            <Text style={{ color: pwRules.hasNumber ? 'green' : 'gray' }}>• 숫자 포함</Text>
            <Text style={{ color: pwRules.hasSpecial ? 'green' : 'gray' }}>• 특수문자 포함</Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder="비밀번호 확인"
            secureTextEntry
            value={state.confirmPassword}
            onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'confirmPassword', value: text })}
          />

          <TextInput
            style={styles.input}
            placeholder="이름"
            value={state.name}
            onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'name', value: text })}
          />
        </>
      )}

      <TextInput
        style={styles.input}
        placeholder="닉네임"
        value={state.nickname}
        onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'nickname', value: text })}
      />

      <TextInput
        style={styles.input}
        placeholder="휴대전화번호 - 없이 입력"
        value={state.phoneNumber}
        onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'phoneNumber', value: text })}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: '#000' }}>{dayjs(state.birth).format('YYYY년 MM월 DD일')}</Text>
      </TouchableOpacity>

      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <DatePicker
              date={state.birth}
              mode="date"
              maximumDate={new Date()}
              onDateChange={(date) => dispatch({ type: 'SET_FIELD', field: 'birth', value: date })}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.calendarCloseBtn}>
              <Text style={{ fontWeight: 'bold' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TextInput
        style={styles.input}
        placeholder="주소 입력"
        value={state.address}
        onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'address', value: text })}
      />

      <Text style={styles.label}>주거유형</Text>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkbox}>
          <CustomCheckbox
            checked={state.residenceType === 'HOUSE_VILLA'}
            onToggle={() => dispatch({ type: 'SET_FIELD', field: 'residenceType', value: state.residenceType === 'HOUSE_VILLA' ? '' : 'HOUSE_VILLA' })}
          />
          <Text style={styles.residenceText}>빌라/주택</Text>
        </View>
        <View style={styles.checkbox}>
          <CustomCheckbox
            checked={state.residenceType === 'APT_OFFICETEL'}
            onToggle={() => dispatch({ type: 'SET_FIELD', field: 'residenceType', value: state.residenceType === 'APT_OFFICETEL' ? '' : 'APT_OFFICETEL' })}
          />
          <Text style={styles.residenceText}>아파트/오피스텔</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupText}>완료</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: '#fff',
  },
  logoBox:{
    width: wp('50%'),
    height: hp('10%'),
    marginBottom: hp('2%'),
  },
  logoImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  label: {
    marginBottom: hp('1%'),
    color: '#898989',
    fontSize: wp('4%'),
  },
  input: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: hp('7.5%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
    justifyContent: 'center',
    fontSize: wp('4%'),
  },
  signupButton: {
    backgroundColor: '#C8F589',
    height: hp('6%'),
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2.5%'),
  },
  signupText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: wp('5%'),
    width: '90%',
  },
  calendarCloseBtn: {
    marginTop: hp('1%'),
    alignSelf: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: hp('6%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2%'),
  },
  checkbox: {
    flexDirection: 'row'
  },
  residenceText: {
    alignSelf: 'center',
    fontSize: wp('3.5%'),
  },
  pwRuleBox : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('1.5%'),
  },
});

export default SignupPage;
