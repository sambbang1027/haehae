import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { navigate } from '../../navigation/NavigationService';
import { LoginStackParamList } from '../../navigation/LoginNavigator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ShowIdPage = () => {
  const route = useRoute<RouteProp<LoginStackParamList, 'ShowId'>>();
  const {maskedEmail} = route.params;

  const handleFindId = () =>{
    navigate('LoginStack', {screen : 'Login'});
  }
  const goToFindPw = () =>{
    navigate('LoginStack', {screen: 'FindPw'});
  }
  return (
    <View style={styles.container}>
        <View style={styles.headerBox}>
            <Image
                source={require('../../assets/images/logo.png')}
                style={styles.logo}
                />
        </View>
        <View style={styles.textBox}>
            <Text style={styles.subtitle}>회원님의 이메일은</Text>
            <Text style={styles.maskedEmail}>{maskedEmail} </Text>
            <Text style={styles.subtitle}>입니다.</Text> 

        </View>
          
       
      <TouchableOpacity style={styles.submitButton} onPress={handleFindId}>
        <Text style={styles.submitText}>로그인 페이지로 이동</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerTitle}>안내</Text>
      </View>
      <TouchableOpacity onPress={goToFindPw}>
        <Text style={styles.linkText}>비밀번호를 잊으셨나요?</Text>
      </TouchableOpacity>
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
  textBox:{
  backgroundColor: '#F5F5F5',
  paddingVertical: hp('2.46%'),
  paddingHorizontal: hp('3.08%'),
  borderRadius: 10,
  alignItems: 'center',
  marginBottom: hp('2.96%'),
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
  },
  subtitle: {
    marginVertical: hp('1.23%'),
    fontSize: hp('2.4%'),
  },
  maskedEmail :{
    fontSize : hp('3%'),
    color: '#00A86B',
    fontWeight : '700'
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
  linkText: {
    fontSize: hp('2%'),
    color: '#009944',
    marginTop: hp('3%'),
    paddingHorizontal: wp('5%'),
    lineHeight: hp('2.8%'),
    textDecorationLine: 'underline',

  },


});
export default ShowIdPage;