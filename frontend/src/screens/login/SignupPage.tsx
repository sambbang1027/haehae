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
  phone: string;
  birthDate: Date;
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
  phone: '',
  birthDate: new Date(),
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

const SignupPage: React.FC = () => {
  const route = useRoute<RouteProp<SignupParams>>();
  const isSocial = route.params?.loginType === 'social';

  const [state, dispatch] = useReducer(reducer, initialState);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

  const handleSignup = () => {
    console.log('회원가입 완료', state);
  };

  const handleTimer = () => {
    if(intervalId){
      clearInterval(intervalId);
    }
    setTimer(180);
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

  const validatePassword = (password) => ({
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
          <View style={styles.inputBox}>
            <Text style={styles.label}>이메일 입력</Text>
            <TextInput
              style={styles.input}
              value={state.email}
              onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'email', value: text })}
              placeholder="example@email.com"
            />
            <TouchableOpacity style={styles.codeButton} onPress={handleTimer}>
              <Text style={styles.codeText}>인증번호 전송</Text>
            </TouchableOpacity>      
          </View>

          <View style={styles.inputBox}>
            <Text style={styles.label}>인증번호 입력</Text>
            <TextInput
              style={styles.input}
              value={state.authCode}
              onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'authCode', value: text })}
            />
            <TouchableOpacity style={styles.codeButton}><Text style={styles.codeText}>확인</Text></TouchableOpacity>
            {timer > 0 && (
              <Text style={styles.timer}>
                {String(Math.floor(timer / 60)).padStart(2, '0')}:
                {String(timer % 60).padStart(2, '0')}
              </Text>
            )}
          </View>

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
        value={state.phone}
        onChangeText={(text) => dispatch({ type: 'SET_FIELD', field: 'phone', value: text })}
      />

      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
        <Text style={{ color: '#000' }}>{dayjs(state.birthDate).format('YYYY년 MM월 DD일')}</Text>
      </TouchableOpacity>

      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <DatePicker
              date={state.birthDate}
              mode="date"
              maximumDate={new Date()}
              androidVariant="nativeAndroid"
              onDateChange={(date) => dispatch({ type: 'SET_FIELD', field: 'birthDate', value: date })}
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
            checked={state.residenceType === 'villa'}
            onToggle={() => dispatch({ type: 'SET_FIELD', field: 'residenceType', value: state.residenceType === 'villa' ? '' : 'villa' })}
          />
          <Text style={styles.residenceText}>빌라/주택</Text>
        </View>
        <View style={styles.checkbox}>
          <CustomCheckbox
            checked={state.residenceType === 'apt'}
            onToggle={() => dispatch({ type: 'SET_FIELD', field: 'residenceType', value: state.residenceType === 'apt' ? '' : 'apt' })}
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
    padding: 20,
    backgroundColor: '#fff',
  },
  logoBox:{
    width: 180,
    height: 80,
    marginBottom: 10,
  },
  logoImage: {
    width: 180,
    height: 50,
  },
  label: {
    marginBottom: 4,
    color: '#898989',
  },
  input: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: 48,
    paddingHorizontal: 10,
    marginBottom: 15,
    justifyContent: 'center',
  },
  codeButton: {
    position: 'absolute',
    right: 3,
    top: 26,
    backgroundColor: '#fff',
    borderColor: '#5da000',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  codeText: {
    color: '#5da000',
    fontWeight: 'bold',
  },
  timer: {
     marginLeft: 5 ,
     marginBottom: 10, 
     color: 'green', 
     fontWeight: 500,
     fontSize: 15,
  },
  signupButton: {
    backgroundColor: '#C8F589',
    height: 50,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signupText: {
    fontSize: 16,
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
    padding: 20,
    width: '90%',
  },
  calendarCloseBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    height: 48,
    paddingHorizontal: 10,
    marginBottom: 15,

  },
  checkbox: {
    flexDirection: 'row'
  },
  residenceText: {
    alignSelf: 'center'
  },
  pwRuleBox : {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
});

export default SignupPage;
