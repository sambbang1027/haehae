import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { navigate } from '../../navigation/NavigationService';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import api from '../../api/AxiosInstance';
import { useToast } from '../../context/ToastContext';

const FindPwPage = () => {
  const [email, setEmail] = useState<string>('');
  const [authCode, setAuthCode] = useState<string>('');
  const [timer, setTimer] = useState<number>(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const {showToast} = useToast();

  const handleVerficationCode = async() => {
    try{
      const response = await api.post('/email/send/code' ,{
        email : email,
        verificationType : 'FindPw',
      })
      if(response.data.code === "SUCCESS"){
        showToast({message : '인증번호가 발송되었습니다.'});
        if (intervalId) {
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
        }, 1000);
        setIntervalId(id);
      }
    }catch(err){
      console.error('인증번호 전송 실패',err);
    }
  };

  const handleCheckVerificationCode = async() =>{
    try{
      const response = await api.post('/email/verify/pw-reset/code',{
        verificationType : 'FindPw',
        email : email,
        code : authCode,
      })
      if(response.data.code === 'SUCCESS'){
        showToast({message: '인증되었습니다.'});
        console.log(response.data);
        navigate('LoginStack', { screen: 'SetPw', params: { token: response.data.data } });

      }
    }catch(err){
      console.error('인증번호 검증 실패', err);
    }
  }


  return (
<ScrollView style={styles.container}>
    <View>
      <View style={styles.headerBox}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.subtitle}>
          Haehae에 가입했던 이메일을 입력해주세요.{'\n'}
          비밀번호 재설정 인증번호를 보내드립니다.
        </Text>
      </View>

      <View style={styles.inputConatainer}>
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder='이메일 입력'
            value={email}
            onChangeText={setEmail}
          />
          <TouchableOpacity style={styles.codeButton} onPress={handleVerficationCode}>
            <Text style={styles.codeText}>인증번호 전송</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder='인증번호 입력'
            value={authCode}
            onChangeText={setAuthCode}
          />
          {timer > 0 && (
            <Text style={styles.timer}>
              {String(Math.floor(timer / 60)).padStart(2, '0')}:
              {String(timer % 60).padStart(2, '0')}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleCheckVerificationCode}>
        <Text style={styles.submitText}>비밀번호 재설정</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>안내</Text>
      </View>
      <Text style={styles.notice}>
        • 소셜 회원가입(Google, Kakao)을 진행하신 회원은 해당 사이트에서 비밀번호를 찾을 수 있습니다.
      </Text>
    </View>
</ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  headerBox: {
    flexDirection: 'column',
    gap: hp('2%'),
    marginBottom: hp('3%'),
    marginLeft: wp('6%'),
  },
  logo: {
    marginTop: hp('3%'),
    width: wp('26%'),
    height: hp('4%'),
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: wp('4.2%'),
    fontFamily: 'Inter-Regular',
    color: '#000',
    lineHeight: hp('3.5%'),
  },
  inputConatainer: {
    gap: hp('1.5%'),
    alignItems: 'center',
  },
  inputBox: {
    width: wp('90%'),
  },
  input: {
    width: '100%',
    height: hp('6.5%'),
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: wp('1%'),
    paddingHorizontal: wp('4%'),
    justifyContent: 'center',
  },
  codeButton: {
    position: 'absolute',
    right: wp('2%'),
    top: hp('1%'),
    backgroundColor: '#fff',
    borderColor: '#5da000',
    borderWidth: 1,
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
  },
  codeText: {
    color: '#5da000',
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
  timer: {
    marginLeft: wp('2%'),
    marginTop: hp('1%'),
    color: 'green',
    fontWeight: '500',
    fontSize: wp('4%'),
  },
  submitButton: {
    marginTop: hp('3%'),
    width: wp('90%'),
    height: hp('6.5%'),
    borderRadius: wp('2%'),
    backgroundColor: '#C8F589',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  submitText: {
    fontWeight: '700',
    fontSize: wp('4%'),
    color: '#000',
  },
  footer: {
    marginTop: hp('3%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: hp('6%'),
    width: '100%',
    justifyContent: 'center',
  },
  footerTitle: {
    fontSize: wp('4.5%'),
    color: '#000',
    paddingHorizontal: wp('5%'),
  },
  notice: {
    fontSize: wp('4%'),
    color: '#000',
    width: wp('90%'),
    marginVertical: hp('3%'),
    alignSelf: 'center',
  },
});

export default FindPwPage;
