import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const PasswordConfirmScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const userType = route.params?.loginType || 'email';
  const [password, setPassword] = useState('');

  const handleConfirm = () => {
    if (userType === 'email') {
      console.log('입력된 비밀번호:', password);
      navigation.navigate('EditUserInfo');
    } else {
      navigation.navigate('VerifySocialUser');
    }
  };

  const goToFindPW = () => {
    navigation.navigate('LoginStack', { screen: 'FindPw' });
  };


  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.description}>
        {userType === 'email'
          ? '회원님의 정보보호를 위한 확인 절차입니다.\n비밀번호를 입력해주세요.'
          : '회원님의 정보보호를 위해 재로그인이 필요합니다.\n아래 버튼을 눌러 본인 인증을 진행해주세요.'}
      </Text>

      {userType === 'email' ? (
        <>
          <View style={styles.inputBox}>
            <TextInput
              style={styles.input}
              placeholder="비밀번호 입력"
              placeholderTextColor="#616161"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
            <Text style={styles.confirmText}>확인</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>본인 인증하기</Text>
        </TouchableOpacity>
      )}

      <View style={styles.bottomLine} />
      {userType === 'email' && (
        <TouchableOpacity onPress={goToFindPW}>
          <Text style={styles.forgotText}>비밀번호 찾기</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PasswordConfirmScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
    marginLeft: 30
  },
  logo: {
    width: 145,
    height: 43,
    resizeMode: 'contain'
  },
  description: {
    fontSize: 18,
    color: '#000',
    marginTop: 40,
    marginLeft: 30,
    lineHeight: 26
  },
  inputBox: {
    backgroundColor: '#eaeaea',
    borderRadius: 3,
    height: 55,
    justifyContent: 'center',
    marginHorizontal: 30,
    marginTop: 40
  },
  input: {
    fontSize: 15,
    paddingHorizontal: 20,
    color: '#000'
  },
  confirmButton: {
    backgroundColor: '#C8F589',
    borderRadius: 5,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
    marginTop: 30
  },
  confirmText: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  bottomLine: {
    height: 3,
    backgroundColor: '#f0f0f0',
    marginTop: 50
  },
  forgotText: {
    fontSize: 18,
    color: '#9c9c9c',
    textDecorationLine: 'underline',
    marginLeft: 50,
    marginTop: 20
  }
});
