import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import api from '../../api/AxiosInstance';
import { navigate } from '../../navigation/NavigationService';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const FindIdPage = () => {
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  


  const handleFindId = async() =>{
    try{
      // 요청에 개인정보가 포함되면 POST로 보내는 게 보안적으로 안전하고 RESTful하다.
      const response = await api.post('/user/find/id', {
        name : name,
        phoneNumber : phone
      });
      if(response.data.code === "SUCCESS"){
        const maskedEmail = response.data.data;
        navigate('LoginStack', {screen: 'ShowId', params:{maskedEmail : maskedEmail}});
      }

    }catch(err){
      console.error('아이디 찾기 실패',  err);
    }
  }

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
                placeholder='휴대전화번호 - 없이 입력'
                value={phone}
                onChangeText={setPhone}
            />
    </View>
       
      <TouchableOpacity style={styles.submitButton} onPress={handleFindId}>
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
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBox: {
    marginTop: hp('5%'),
    marginBottom: hp('4%'),
    gap: hp('3%'),
    paddingHorizontal: wp('5%'),
  },
  logo: {
    width: wp('35%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  subtitle: {
    fontSize: hp('2.6%'),
    lineHeight: hp('3.2%'),
    color: '#000',
    fontFamily: 'Inter-Regular',
  },
  inputConatainer: {
    gap: hp('2%'),
    alignItems: 'center',
  },
  inputBox: {
    width: wp('90%'),
    height: hp('7%'),
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 5,
    paddingHorizontal: wp('4%'),
    fontSize: hp('2%'),
  },
  submitButton: {
    marginTop: hp('3%'),
    width: wp('90%'),
    height: hp('7%'),
    backgroundColor: '#C8F589',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  submitText: {
    fontSize: hp('2%'),
    fontWeight: '700',
    color: '#000',
  },
  footer: {
    marginTop: hp('5%'),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    height: hp('6%'),
    justifyContent: 'center',
  },
  footerTitle: {
    fontSize: hp('2.2%'),
    color: '#000',
    paddingHorizontal: wp('5%'),
  },
  notice: {
    fontSize: hp('2%'),
    color: '#000',
    marginTop: hp('3%'),
    paddingHorizontal: wp('5%'),
    lineHeight: hp('2.8%'),
  },
});

export default FindIdPage;