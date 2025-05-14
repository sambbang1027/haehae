import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

const SetPwPage: React.FC = () => {
  const [oldPwd, setOldPwd] = useState<string>('');
  const [newPwd, setNewPwd] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const validatePassword = (pwd: string) => ({
    length: pwd.length >= 8 && pwd.length <= 12,
    hasLetter: /[a-zA-Z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
    hasSpecial: /[^a-zA-Z0-9]/.test(pwd),
  });

      const pwRules = validatePassword(newPwd);
    
    

  return (
    <View style={styles.container}>
        <View style={styles.headerBox}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
        </View>
    <View style={styles.inputConatainer}>
            <TextInput
                style={styles.input}
                placeholder='현재 비밀번호 입력'
                secureTextEntry
                value={oldPwd}
                onChangeText={setOldPwd}
            />
            <TextInput
                style={styles.input}
                placeholder='새비밀번호 입력'
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
                placeholder='새비밀번호 확인'
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
                {newPwd && confirmPassword &&
                    (newPwd === confirmPassword
                    ? '비밀번호가 일치합니다.'
                    : '비밀번호가 일치하지 않습니다.')}
            </Text>
    </View>
       
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>비밀번호 변경</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    flex: 1,
    position: 'relative',
  },
  headerBox:{
    flexDirection:'column',
    gap: 30,
    marginBottom: 30,
    marginLeft: 30,
  },
  logo: {
    marginTop: 40,
    width: 138,
    height: 39,
    resizeMode: 'contain',
  },
  inputConatainer:{
    gap: 15,
    alignItems: 'center'
  },
  input: {
    width: 358,
    height: 55,
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 3,
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  submitButton: {
    marginTop: 13,
    width: 358,
    height: 55,
    borderRadius: 5,
    backgroundColor: '#C8F589',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  submitText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#000',
  },
  pwRuleBox : {
    flexDirection: 'row',
    gap: 15,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 30,
  },
});
export default SetPwPage;