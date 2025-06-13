import React, { useReducer, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


  type EmailAuthProps = {
  email: string;
  authCode: string;
  timer: number;
  onEmailChange: (email: string) => void;
  onCodeChange: (code: string) => void;
  onSendCode: () => void;
  onVerifyCode: () => void;
};

const EmailVerification: React.FC<EmailAuthProps> = ({
  email,
  authCode,
  timer,
  onEmailChange,
  onCodeChange,
  onSendCode,
  onVerifyCode,
}) => {
  return (
    <>
      <View style={styles.inputBox}>
        <Text style={styles.label}>이메일 입력</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={onEmailChange}
          placeholder="example@email.com"
        />
        <TouchableOpacity style={styles.codeButton} onPress={onSendCode}>
          <Text style={styles.codeText}>인증번호 전송</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.label}>인증번호 입력</Text>
        <TextInput
          style={styles.input}
          value={authCode}
          onChangeText={onCodeChange}
        />
        <TouchableOpacity style={styles.codeButton} onPress={onVerifyCode}>
          <Text style={styles.codeText}>확인</Text>
        </TouchableOpacity>
        {timer > 0 && (
          <Text style={styles.timer}>
            {String(Math.floor(timer / 60)).padStart(2, '0')}:
            {String(timer % 60).padStart(2, '0')}
          </Text>
        )}
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  label: {
    marginBottom: hp('1%'),
    color: '#898989',
    fontSize: wp('4%'),
  },
  inputBox:{
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
  codeButton: {
    position: 'absolute',
    right: wp('2%'),
    top: hp('4.5%'),
    backgroundColor: '#fff',
    borderColor: '#5da000',
    borderWidth: 1,
    borderRadius: 18,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
  },
  codeText: {
    color: '#5da000',
    fontWeight: 'bold',
    fontSize: wp('3.5%'),
  },
  timer: {
    marginLeft: wp('2%'),
    marginBottom: hp('1.5%'),
    color: 'green',
    fontWeight: '500',
    fontSize: wp('4%'),
  }
});
export default EmailVerification;