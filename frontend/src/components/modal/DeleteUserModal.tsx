import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,StyleSheet,ScrollView,Image } from 'react-native';
import { useUser } from '../../context/UserContext';
import { useModal } from '../../context/ModalContext';
import { navigate } from '../../navigation/NavigationService';
import api from '../../api/AxiosInstance';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DeleteUserModal = () => {
  const { user } = useUser();
  const { hideModal } = useModal();
  const [password, setPassword] = useState('');

  const handleConfirmDelete = async () => {
    try {
      const response = await api.post('/user/delete', {
        userId: user?.userId,
        password,
      });
      if (response.data.code === 'SUCCESS') {
        hideModal();
        navigate('LoginStack', { screen: 'Login' });
      }
    } catch (error) {
      console.error('탈퇴 오류:', error);
    }
  };

  return (
    <View style={styles.overlay} >
    <ScrollView
     showsVerticalScrollIndicator={false}
     contentContainerStyle={styles.content}>
    <View style={styles.imgBox}>
        <Image style={styles.img} 
        source={require('../../assets/icons/confirm.png')} />
    </View>
        
      <Text style={styles.deleteText}>탈퇴하시려면 {'\n'} 비밀번호를 입력해주세요.</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputPw}
      />
    <Text style={styles.alertText}>탈퇴 시 모든 정보는 복구되지 않습니다.</Text>
      <View style={styles.btnContainer}>
        <TouchableOpacity onPress={hideModal} style={styles.btnBox}>
          <Text style={styles.btnText}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleConfirmDelete} style={styles.btnBox}>
          <Text style={styles.btnText}>탈퇴하기</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </View>
  );
};

export default DeleteUserModal;

const styles = StyleSheet.create({

overlay :{
  width: '100%',
  padding: wp('2%'),
},
content:{
     flexGrow: 1,
},
deleteText:{
    fontSize: wp('4.5%'),
    marginBottom : hp('3%'),
    flexWrap: 'wrap',
    width : '100%',
    flexShrink : 1,
    textAlign : 'center'
},
inputPw:{
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 6,
  padding: hp('1.3%'),
  fontSize: wp('4%'),
  marginBottom: hp('2%'),

},
btnContainer:{
    flexDirection : 'row',
    justifyContent : 'center'
    
},
btnBox :{
  paddingVertical: hp('1.5%'),
  paddingHorizontal: wp('4%'),
  borderRadius: 6,
  marginRight: wp('3%'),
  backgroundColor: 'rgba(147, 235, 24, 0.51)',
},
btnText:{
    fontSize : wp('4%'),
    fontWeight: '700'
},
imgBox:{
    alignItems: 'center'
},
img:{
    width : 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
},
alertText:{
    fontSize: wp('3.5%'),
    textAlign: 'center',
    marginBottom: hp('2%'),
    color : 'red'
}

});