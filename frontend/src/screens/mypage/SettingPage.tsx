import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { MyPageStackParamList } from '../../navigation/MyPageNavigator'; 
import { navigate } from '../../navigation/NavigationService';
import { useUser } from '../../context/UserContext';
import api from '../../api/AxiosInstance';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useModal } from '../../context/ModalContext';
import DeleteUserModal from '../../components/modal/DeleteUserModal';

type SettingItemProps = {
  label: string;
  route: {
    screen: keyof MyPageStackParamList;
    params?: MyPageStackParamList[keyof MyPageStackParamList];
  };
  style?: object;
};

const SettingItem = ({ label, route, style }: SettingItemProps) => {
  const handlePress = () => {
    navigate('MyPageStack', {
      screen: route.screen,
      params: route.params,
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} >
      <Text style={style}>{label}</Text>
    </TouchableOpacity>
  );
};

const SettingPage = () => {

useEffect(()=>{
  getUserInfo();
},[]);

  const {user} = useUser();
  const [residenceType, setResidenceType] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const {showModal, hideModal} = useModal();
  const [password, setPassword] = useState<string>('');

  // 유저 정보 셋팅 
  const getUserInfo = async()=> {
    try{
      const response = await api.get('/user/setting/info', {
        params :{userId:  user?.userId }
      });
      console.log('받아온 데이터 : ', response.data);
      if(response.data.code === 'SUCCESS'){
        setUserName(response.data.data.username);
        setResidenceType(response.data.data.residenceType == 'HOUSE_VILLA'? '주택/빌라' : '아파트/오피스텔');
      }
    }catch(error){
      console.error('유저 정보 셋팅 실패', error);
    }
  }

  // 회원 탈퇴
  const handledeleteUser = () =>{
    showModal({
      type: 'default',
      content : <DeleteUserModal />,
        // <View>
        //   <View>
        //     <Text>
        //       탈퇴 시 모든 정보는 삭제되며 복구되지 않습니다.
        //     </Text>
        //     <Text>
        //       비밀번호를 다시 입력해주세요.
        //     </Text>
        //   </View>
        //   <TextInput
        //     value={password}
        //     onChangeText={(text) => setPassword(text)}
        //     secureTextEntry
        //     style={{
        //       borderWidth: 1,
        //       borderColor: '#ccc',
        //       borderRadius: 5,
        //       padding: 10,
        //       marginTop: 10,
        //     }}
        //   />
        //   <View>
        //     <TouchableOpacity onPress={hideModal}>
        //       <Text>취소</Text>
        //     </TouchableOpacity>
        //     <TouchableOpacity onPress={handleConfirmDelete}>
        //       <Text>탈퇴하기</Text>
        //     </TouchableOpacity>
        //   </View>
        // </View>
      
      
    });
  }
  // 회원 탈퇴 서버 처리 
  const handleConfirmDelete = async()=>{
     try{
      const response = await api.post('/user/delete',{
         userId : user?.userId,
         password : password,
      });
      if(response.data.code === 'SUCCESS'){
        hideModal();
        navigate('LoginStack', {screen: 'Login'});
      }
    }catch(error){
      console.error('회원 탈퇴 성공 :' , error )
    }
  }
   

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.userSection}>
          <Text style={styles.userName}>{userName}님</Text>
          <Text style={styles.residence}>{residenceType}</Text>
        </View>
        <SettingItem label="회원정보 수정" route={{screen :"CheckPw"}} style={styles.itemText} />
        <SettingItem label="프로필 수정" route={{screen :"EditProfile"}} style={styles.itemText}/>
        <SettingItem label="비밀번호 변경" route={{screen :"ChangePw"}} style={styles.itemText} />

        <View style={styles.grayDivider} />


      <TouchableOpacity onPress={handledeleteUser} >
        <Text style={styles.withdrawText}>회원탈퇴</Text>
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default SettingPage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentWrapper: {
    paddingTop: hp('3%'),
  },
  userSection: {
    paddingHorizontal: wp('6%'),
    marginBottom: hp('3.5%'),
  },
  userName: {
    fontSize: wp('5.5%'),
    fontWeight: '600',
    color: '#000',
  },
  residence: {
    fontSize: wp('4.3%'),
    color: '#9c9c9c',
    marginTop: hp('1%'),
  },
  grayDivider: {
    height: hp('1%'),
    backgroundColor: '#f0f0f0',
    marginVertical: hp('3%'),
  },
  itemText: {
    fontSize: wp('4.5%'),
    marginLeft: wp('6%'),
    marginBottom: hp('2.5%'),
    paddingHorizontal: wp('6%'),
  },
  withdrawText: {
    color: '#9c9c9c',
    textDecorationLine: 'underline',
    fontSize: wp('4.2%'),
    paddingHorizontal: wp('6%'),
  },
});

