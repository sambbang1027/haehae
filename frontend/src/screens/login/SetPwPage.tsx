import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { LoginStackParamList } from '../../navigation/LoginNavigator';
import api from '../../api/AxiosInstance';
import { useToast } from '../../context/ToastContext';
import { navigate } from '../../navigation/NavigationService';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SetPwPage = () => {
  const route = useRoute<RouteProp<LoginStackParamList, 'SetPw'>>();
  const [newPwd, setNewPwd] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { showToast } = useToast();

  const validatePassword = (pwd: string) => ({
    length: pwd.length >= 8 && pwd.length <= 12,
    hasLetter: /[a-zA-Z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
    hasSpecial: /[^a-zA-Z0-9]/.test(pwd),
  });

  const pwRules = validatePassword(newPwd);

  const handleResetPw = async () => {
    try {
      const response = await api.post('/user/reset/pw', {
        token: route.params.token,
        newPwd,
      });

      if (response.data.code === 'SUCCESS') {
        showToast({ message: '비밀번호가 변경되었습니다.' });
        navigate('LoginStack',{screen : 'Login'});
      }
    } catch (error) {
      console.error('비밀번호 변경 실패', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.headerBox}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="새비밀번호 입력"
            secureTextEntry
            value={newPwd}
            onChangeText={setNewPwd}
          />
          <View style={styles.pwRuleBox}>
            <Text style={{ color: pwRules.length ? 'green' : 'gray' }}>
              • 8~12자
            </Text>
            <Text style={{ color: pwRules.hasLetter ? 'green' : 'gray' }}>
              • 영문 포함
            </Text>
            <Text style={{ color: pwRules.hasNumber ? 'green' : 'gray' }}>
              • 숫자 포함
            </Text>
            <Text style={{ color: pwRules.hasSpecial ? 'green' : 'gray' }}>
              • 특수문자 포함
            </Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="새비밀번호 확인"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <Text
            style={[
              styles.label,
              newPwd && confirmPassword && {
                color: newPwd === confirmPassword ? 'green' : 'red',
              },
            ]}
          >
            {newPwd &&
              confirmPassword &&
              (newPwd === confirmPassword
                ? '비밀번호가 일치합니다.'
                : '비밀번호가 일치하지 않습니다.')}
          </Text>
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handleResetPw}>
          <Text style={styles.submitText}>비밀번호 변경</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollContent: {
    paddingBottom: hp('5%'),
  },
  headerBox: {
    marginTop: hp('5%'),
    marginLeft: wp('8%'),
    marginBottom: hp('3%'),
  },
  logo: {
    width: wp('38%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  inputContainer: {
    alignItems: 'center',
    gap: hp('2%'),
  },
  input: {
    width: wp('90%'),
    height: hp('6.5%'),
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 5,
    paddingHorizontal: wp('4%'),
  },
  pwRuleBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: wp('90%'),
    gap: wp('3%'),
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: wp('5%'),
    fontSize: wp('3.5%'),
  },
  submitButton: {
    marginTop: hp('3%'),
    width: wp('90%'),
    height: hp('6.5%'),
    borderRadius: 5,
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
});

export default SetPwPage;
