import React, { useReducer, useState , useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

import { useRoute, RouteProp } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../api/AxiosInstance';
import { navigate } from '../../navigation/NavigationService';
import { useToast } from '../../context/ToastContext';
import CommonSignup from '../../components/login/CommonSignup';
import LocalSignup from '../../components/login/LocalSignup';
import SocialSignup from '../../components/login/SocialSignup';
import {
  CommonState,
  Action as CommonAction,
  commonReducer,
  initialCommonState
} from '../../types/login/CommonSignupType';

import{
  LocalSignupState,
  LocalSignupAction,
  localSignupReducer,
  initialLocalSignupState
} from'../../types/login/LocalSignupType';

import {
  SocialSignupState,
  SocialSignupAction,
  SocialSignupReducer,
  initialSocialSignupState
} from '../../types/login/SocialSignupType';

type SignupParams = {
  params?: {
    loginType?: 'local'| 'google' | 'kakao';
    email? : string;
    name? : string;
  };
};

const SignupPage= () => {

  // 로컬인지 소셜인지 파악 
  const route = useRoute<RouteProp<SignupParams>>();
  const loginType = route.params?.loginType?? 'local';
  const isSocial = loginType !== 'local';

  useEffect (()=>{
    if(isSocial && route.params){
      socialDispatch({type: 'SET_FIELD', field: 'email', value :route.params?.email || ''});
      socialDispatch({type: 'SET_FIELD', field: 'name', value :route.params?.name || ''});
      socialDispatch({type: 'SET_FIELD', field: 'socialProvider', value : loginType.toUpperCase()});
    }
   
  },[]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const {showToast} = useToast();
  const [isVerified, setIsVerfied] = useState(false);

  const [socialState, socialDispatch] = useReducer(SocialSignupReducer, initialSocialSignupState);
  const [localState, localDispatch] = useReducer(localSignupReducer, initialLocalSignupState);
  const [commonState, commonDispatch] = useReducer(commonReducer, initialCommonState);
  
  type State = {
  email: string;
  password: string;
  nickname: string;
  name: string;
  phoneNumber: string;
  birth: string;
  address: string;
  bcode: string;
  residenceType: string;
  socialProvider : string;
};

const finalPayload: State = {
  email: isSocial ? socialState.email : localState.email,
  password: isSocial ? '' : localState.password, // 소셜은 비밀번호 없음
  nickname: commonState.nickname,
  name: isSocial ? socialState.name : localState.name,
  phoneNumber: commonState.phoneNumber,
  birth: commonState.birth.toISOString().split('T')[0],
  address: commonState.address,
  bcode: commonState.bcode, // ← 이건 address 선택시 함께 설정되도록 만들어야 함
  residenceType: commonState.residenceType,
  socialProvider: loginType.toUpperCase(),
};


  // 회원가입 
  const handleSignup = async() => {
    try{
      
      const url = isSocial ? '/user/register/social' : 'user/register/local';

      const response = await api.post(url, finalPayload);
      if(response.data.code = "SUCCESS"){
        showToast({message: '회원가입 완료'});
        commonDispatch({type : 'RESET'});
        navigate('LoginStack', {screen: 'Login'});
      }
    }catch(error){
      console.error(error);
      showToast({message: '회원가입 실패'});
    }
  };

// 이메일 인증번호 전송 
const handleSendCode = async() =>{
  try{
    const response = await api.post('/email/send/code', {
      email : localState.email,
    });
    console.log(response);

    if(response.data.code === "SUCCESS"){
      showToast({ message: '인증코드가 발송되었습니다.' });
      handleTimer(); // 타이머 시작
    }
  }catch(error: any){
    const code = error.response?.data.code;
    console.log(code);
    switch(code){
      case "DUPLICATE_EMAIL":
        showToast({message: '이미 가입된 이메일입니다.'}); break;
      case "INVALID_EMAIL_FORMAT" :
        showToast({message: '유효하지 않은 이메일 형식입니다.'}); break;
      case "INTERNAL_SERVER_ERROR" :
        showToast({message : '네트워크 오류가 발생했습니다.'}); break;
      }
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

// 인증번호 체크
  const handleVerifyCode = async()=>{
     const body = {
      email: localState.email,
      code: localState.authCode,
    };
    try{
      const response = await api.post('/email/verify/code', body)
      if(response.status === 200){
        showToast({message : '인증이 완료되었습니다.'});
        setIsVerfied(true);
      }
    }catch(error){
      showToast({message: '잘못된 인증번호입니다.'});
      console.error(error);
    }
  };
  
  // 닉네임 중복확인
  const handleDuplicateNickname = async() =>{
    if(commonState.nickname.trim() == ''){
      showToast({message: '닉네임을 입력해주세요'});
    return;
    }

    try{
      const response = await api.get('/user/register/check/nickname',{
       params: {
        nickname: commonState.nickname,
      },
    });
      if(response.data.data === false){
        showToast({message : '사용가능한 닉네임입니다'})
      }else if(response.data.data === true){
        showToast({message: '이미 사용중인 닉네임입니다'})
      }
    }catch(error){
      showToast({message: '네트워크 오류 발생 \n 다시 시도해주세요.'});
      console.error(error);
    }
  }


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.logoBox}>
        <Image 
          style={styles.logoImage}
          source={require('../../assets/images/logo.png')}
        />
      </View>
    {isSocial ? (
      <SocialSignup state={socialState} dispatch={socialDispatch} />
    ) : (
      <LocalSignup state={localState} 
      dispatch={localDispatch} 
      timer={timer}
      onSendCode={handleSendCode} 
      onVerifyCode={handleVerifyCode}
      isVerified={isVerified}
      />
    )
  }
    {/* CommonSignup에 전달 */}
    <CommonSignup
      state={commonState}
      dispatch={commonDispatch}
      showDatePicker={showDatePicker}
      setShowDatePicker={setShowDatePicker}
      onDuplicateNickname = {handleDuplicateNickname}
      onSelectAddress={(address, bcode) => {
      commonDispatch({ type: 'SET_FIELD', field: 'address', value : address });
      commonDispatch({ type: 'SET_FIELD', field: 'bcode', value: bcode });
       }}
    />
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

});

export default SignupPage;
