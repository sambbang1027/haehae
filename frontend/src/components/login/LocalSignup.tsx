import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import EmailVerification from '../../components/login/EmailVerification';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { LocalSignupState, LocalSignupAction } from '../../types/login/LocalSignupType';

type Props = {
  state: LocalSignupState;
  dispatch: React.Dispatch<LocalSignupAction>;
  timer: number;
  onSendCode: () => void;
  onVerifyCode : () =>void;
  isVerified: boolean;
};


const LocalSignup = ({ state, dispatch, timer, onSendCode, onVerifyCode, isVerified}: Props) => {
  const validatePassword = (password: string) => ({
    length: password.length >= 8 && password.length <= 12,
    hasLetter: /[a-zA-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^a-zA-Z0-9]/.test(password),
  });

  const pwRules = validatePassword(state.password);

  return (
    <View>
      <EmailVerification
        email={state.email}
        authCode={state.authCode}
        timer={timer}
        onEmailChange={(text) => dispatch({ type: 'SET_FIELD', field: 'email', value: text })}
        onCodeChange={(text) => dispatch({ type: 'SET_FIELD', field: 'authCode', value: text })}
        onSendCode={onSendCode}
        onVerifyCode={onVerifyCode}
        isVerified={isVerified}
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
    </View>
  );
};

const styles = StyleSheet.create({
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
  pwRuleBox: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp('1.5%'),
  },
});

export default LocalSignup;
