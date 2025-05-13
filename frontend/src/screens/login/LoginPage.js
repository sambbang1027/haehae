import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import CustomCheckbox from '../../components/layouts/CustomCheckBox.js';

const LoginPage = ({ navigation }) => {
  const [autoLogin, setAutoLogin] = React.useState(false);
  const [saveId, setSaveId] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleGoogleLogin = () => {
    console.log('Google 로그인');
  };
  const handleKakaoLogin = () => {
    console.log('kakao 로그인');
  }
  const goToSignup = () => {
    navigation.navigate('Signup');
  }
  const goToFindId = () => {
    navigation.navigate('FindId');
  }
  const goToFindPw = () => {
    navigation.navigate('FindPw');
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
      <TouchableOpacity style={styles.loginButton}>
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
    paddingTop: 80,
  },
  logoImage: {
    width: 299,
    height: 84,
    marginTop: 30,
    marginBottom: 50,
  },
  input: {
    width: 358,
    height: 55,
    borderColor: '#959595',
    borderWidth: 1,
    borderRadius: 3,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    width: 358,
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    fontSize: 15,
    color: '#000',
    marginLeft: 5,
  },
  loginButton: {
    width: 358,
    height: 55,
    backgroundColor: '#000',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
  linkRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 358,
    marginBottom: 30,
  },
  idPwBox:{
    flexDirection: 'row',
    gap: 10,
  },
  link: {
    fontSize: 14,
    color: '#898989',
  },
  kakaoButton: {
    backgroundColor: '#fff',
    borderColor: '#747775',
    height: 50,
    justifyContent: 'center',
    width: 358,
  },
  kakaoLogin: {
    width: 358,
    height: 54,
    marginBottom: 10,
  },
  kakaoIcon: {
    width: 358,
    height: 50,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderColor: '#747775',
    borderWidth: 1,
    borderRadius: 4,
    height: 50,
    justifyContent: 'center',
    width: 358,
    alignSelf: 'center',
    position: 'relative', 
  },
  
  googleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  googleIcon: {
    width: 25,
    height: 25,
    position: 'absolute', 
    left: 12,
  },
  
  googleText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f1f1f',
    alignSelf: 'center',
  },
  
   
});

export default LoginPage;
