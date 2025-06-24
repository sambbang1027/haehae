import React, { useState } from 'react';
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

const LoginPage = () => {
  
  const [autoLogin, setAutoLogin] = useState<boolean>(false);
  const [saveId, setSaveId] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { setUser} = useUser();



  const handleLocalLogin = async() => {
    try{
    const res = await api.post('/auth/login', {
      email,
      password 
    });
      if (res.status === 200) {
        await EncryptedStorage.setItem('accessToken', res.data.accessToken);
        await EncryptedStorage.setItem('refreshToken', res.data.refreshToken);

        const userInfo = await api.get('/auth/me');
        console.log("유저정보 가져오기");
        if (userInfo.status === 200) {
          setUser(userInfo.data);
          
        }
      navigate('MainStack', { screen: 'Main' });
    } else {
      console.log('로그인 실패: 상태 코드', res.status);
    }
  }catch(error){
    console.error(error);
  }
  }

  
  const handleGoogleLogin = () => {
    console.log('Google 로그인');
  };
  const handleKakaoLogin = () => {
    console.log('kakao 로그인');
  }
  const goToSignup = () => {
     navigate('LoginStack' ,{screen : 'Signup'});
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
