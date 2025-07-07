import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CustomCheckbox from '../../components/common/CustomCheckBox.tsx';
import { navigate } from '../../navigation/NavigationService.ts';
import api from '../../api/AxiosInstance.ts';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useUser } from '../../context/UserContext.tsx';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


const LoginPage = () => {
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [saveId, setSaveId] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login} = useUser();

  useEffect(()=> {
    GoogleSignin.configure({
      webClientId : '1032730359503-m2aidsmm9s09ch6g9qq4a9iko7q0p5t7.apps.googleusercontent.com',
    });
    const loadSavedEmail = async () =>{
      const saveId = await EncryptedStorage.getItem('saveId');
      if(saveId === 'true'){
        const savedEmail = await EncryptedStorage.getItem('savedEmail');
        if(savedEmail){
          setEmail(savedEmail);
          setSaveId(true);
        }
        console.log('🧪 saveId:', saveId);
        console.log('📩 savedEmail:', savedEmail);
      }
    };
    loadSavedEmail();
  },[]);


   // 로컬 로그인 
  const handleLocalLogin = async() => {
    try{
    const res = await api.post('/auth/login', {
      email,
      password 
    });
      console.log(res.data);
     if (res.data.code === "SUCCESS") {
      const accessToken = res.data.data.accessToken;
      const refreshToken = res.data.data.refreshToken;

      await EncryptedStorage.setItem('accessToken', accessToken);
      await EncryptedStorage.setItem('refreshToken', refreshToken);
      await EncryptedStorage.setItem('autoLogin', autoLogin ? 'true' : 'false');
      await EncryptedStorage.setItem('saveId', saveId? 'true' : 'false')

      if(saveId){
        console.log('아이디 저장 !!!');
        await EncryptedStorage.setItem('savedEmail', email);
      }

      const userInfo = await api.get('/auth/me');

      if (userInfo.data.code === "SUCCESS") {
        await login(userInfo.data.data );
        navigate('MainStack', { screen: 'Main' });
      } else {
        console.log("❌ 실패");
      }
    }
  }catch(error){
    console.error(error);
  }
  }

  
  const handleGoogleLogin = async() => {
    console.log('Google 로그인');
    try{
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const {idToken} = await GoogleSignin.getTokens();
      console.log('idToken Check!!!!!!!!!!!!!', idToken);
      if(!idToken) throw new Error('Google Id Token Not Found');

      const response = await api.post('auth/social/google', {idToken});

      console.log('로그인 성공', response.data);
    }catch(error){
      console.error('구글 로그인 실패 ', error);
    }


  };
  const handleKakaoLogin = async() => {
// 사업자 등록해야 이메일과 민감정보 받아올 수 있음.. 좀 더 고려해보는걸로
    console.log('kakao 로그인');
  // console.log('📦 KakaoLogin 모듈:', KakaoLogin);

    try{
      console.log('로그인 시도 전');
      const response = await KakaoLogin.login(); // ✅

        console.log(response);
      //  console.log("액세스 토큰 확인 @@ : ",response.accessToken)
      // const user = await api.post('auth/social/kakao',{
      //     provider : 'kakao',
      //     acccessToken: response.accessToken});
      //   console.log(user.data);
    }catch(error){
      console.error('카카오 로그인 실패:', error);
    }
  }



  const goToSignup = () => {
     navigate('LoginStack' ,{screen : 'Signup', params: { loginType: 'local' }});
  }
  const goToFindId = () => {
      navigate('LoginStack' ,{screen : 'FindId'});
  }
  const goToFindPw = () => {
      navigate('LoginStack' ,{screen : 'FindPw'});
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.logoImage}
        source={require('../../assets/images/logo.png')}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디 (이메일 형식)"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호 (8~12자, 영문+숫자+특수문자)"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <CustomCheckbox         
          checked={autoLogin}
          onToggle={() => setAutoLogin(prev => !prev)} />
          <Text style={styles.checkboxLabel}>자동로그인</Text>
        </View>
        <View style={styles.checkboxRow}>
          <CustomCheckbox checked={saveId}
          onToggle={() => setSaveId(prev => !prev)} />
          <Text style={styles.checkboxLabel}>아이디 저장</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLocalLogin}>
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
      <View style={styles.linkRow}>
        <Text style={styles.link} onPress={goToSignup}>회원가입</Text>
        <View style={styles.idPwBox}>
          <Text style={styles.link} onPress={goToFindId}>아이디 찾기</Text>
          <Text style={styles.link}> | </Text>
          <Text style={styles.link} onPress={goToFindPw}>비밀번호 찾기</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.kakaoButton} onPress={handleKakaoLogin}>
        <View style={styles.kakaoLogin}>
          <Image
            source={require('../../assets/images/k-logo.png')}
            style={styles.kakaoIcon}
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <View style={styles.googleWrapper}>
          <Image
            source={require('../../assets/images/g-logo.png')}
            style={styles.googleIcon}
          />
            <Text style={styles.googleText}>Continue with Google</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    paddingTop: hp('10%'),
  },
  logoImage: {
    width: wp('80%'),
    height: hp('10%'),
    resizeMode: 'contain',
    marginTop: hp('2%'),
    marginBottom: hp('5%'),
  },
  input: {
    width: wp('90%'),
    height: hp('6.5%'),
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: wp('4%'),
    marginVertical: hp('1.2%'),
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: wp('90%'),
    justifyContent: 'space-between',
    marginVertical: hp('1.5%'),
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: wp('3.8%'),
    color: '#000',
    marginLeft: wp('1.5%'),
  },
  loginButton: {
    width: wp('90%'),
    height: hp('6.5%'),
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: wp('4%'),
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp('90%'),
    marginBottom: hp('4%'),
  },
  idPwBox: {
    flexDirection: 'row',
    gap: wp('2%'),
  },
  link: {
    fontSize: wp('3.5%'),
    color: '#898989',
  },
    kakaoLogin: {
    width: wp('90%'),
    height: hp('7%'),
    marginBottom: hp('3%'),
  },
  kakaoButton: {
    backgroundColor: '#fff',
    height: hp('6%'),
    justifyContent: 'center',
    width: wp('90%'),
  },
  kakaoIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#747775',
    borderWidth: 1,
    borderRadius: 4,
    height: hp('6%'),
    justifyContent: 'center',
    width: wp('90%'),
    alignSelf: 'center',
    position: 'relative',
  },
  googleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleIcon: {
    width: wp('6%'),
    height: wp('6%'),
    position: 'absolute',
    left: wp('3%'),
  },
  googleText: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    color: '#1f1f1f',
  },
});

export default LoginPage;
