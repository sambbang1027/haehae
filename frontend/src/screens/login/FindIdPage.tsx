import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';

const FindIdPage: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [birth, setBirth] = useState<string>('');
  const [phone, setPhone] = useState<string>('');

  return (
    <View style={styles.container}>
        <View style={styles.headerBox}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
            />
            <Text style={styles.subtitle}>
                가입된 회원 정보로{'\n'}아이디를 확인하세요.
            </Text>
        </View>
    <View style={styles.inputConatainer}>
        <TextInput
                style={styles.inputBox}
                placeholder='이름 입력'
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                style={styles.inputBox}
                placeholder='법정생년월일 6자리'
                value={birth}
                onChangeText={setBirth}
            />
            <TextInput 
                style={styles.inputBox}
                placeholder='휴대전화번호 - 없이 입력'
                value={phone}
                onChangeText={setPhone}
            />
    </View>
       
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitText}>아이디 찾기</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>안내</Text>
      </View>
      <Text style={styles.notice}>
        • 입력하신 정보는 아이디 찾기에만 사용되고 저장되지 않습니다.
      </Text>
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
  subtitle: {
    fontSize: 23,
    fontFamily: 'Inter-Regular',
    color: '#000',
    lineHeight: 28,
  },
  inputConatainer:{
    gap: 15,
    alignItems: 'center'
  },
  inputBox: {
    width: 358,
    height: 55,
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 3,
    paddingHorizontal: 15,
  },
  submitButton: {
    marginTop: 25,
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
  footer: {
    marginTop: 30,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: 55,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  footerTitle: {
    fontSize: 17,
    color: '#000',
    paddingHorizontal: 20,
  },
  notice: {
    fontSize: 15,
    color: '#000',
    width: 350,
    marginVertical: 30,  // 상하
    marginHorizontal: 20 // 좌우
  },
});
export default FindIdPage;