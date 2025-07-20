import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import CustomCheckbox from '../../components/common/CustomCheckBox';
import dayjs from 'dayjs';
import { navigate } from '../../navigation/NavigationService';
import { useUser } from '../../context/UserContext';
import api from '../../api/AxiosInstance';
import AppText from '../../components/common/AppText';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import AddressSearchModal from '../../components/common/AddressSearch';
import { useToast } from '../../context/ToastContext';

const EditUserInfo = () => {
  useEffect(() =>{
    getUserInfo();
  },[]);
  const {user} = useUser();
  const [formData, setFormData] = useState({
    username: '',
    phoneNumber: '',
    birth: '',
    address: '',
    bcode: '',
    residenceType: '',
  });
  const {showToast} = useToast();
  const getUserInfo = async()=>{
    try{
      const response = await api.get('/user/get/edit/info', {
        params:{userId : user?.userId}
      });
      if(response.data.code ==='SUCCESS'){
        setFormData(response.data.data);
      }
    }catch(error){
      console.error('유저 정보 셋팅 실패 ', error);
    }
  }; 

  const [showAddressModal, setShowAddressModal] = useState(false);
  const handleAddressSearch = () => {
    setShowAddressModal(true);
  };

  const handleVerify = () => {
    console.log('본인인증 실행');
  };

  const handleUpdate = async() => {
    try{
      const response = await api.post('/user/edit/info',{
        userId : user?.userId,
        ...formData
      });
      if(response.data.code ==='SUCCESS'){
        showToast({
          message: '회원정보가 수정되었습니다.'
        });
        navigate('MyPageStack',{screen:'SettingPage'});
      }
    }catch(error){
      console.error('회원정보 수정 실패', error);
    }
    console.log('회원정보 수정 완료');
  };

  return (
    <ScrollView style={styles.container}>
      <AppText style={styles.sectionTitle}>회원정보</AppText>

      <View style={styles.infoRow}>
        <AppText style={styles.label}>이름</AppText>
        <AppText style={styles.value}>{formData.username}</AppText>
      </View>

      <View style={styles.infoRow}>
        <AppText style={styles.label}>휴대전화번호</AppText>
        <AppText style={styles.value}>{formData.phoneNumber}</AppText>
      </View>
      
      <View style={styles.infoRow}>
        <AppText style={styles.label}>생년월일</AppText>
        <AppText style={styles.value}>{dayjs(formData.birth).format('YYYY년 MM월 DD일')}</AppText>
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <AppText style={styles.verifyButtonText}>본인인증</AppText>
      </TouchableOpacity>
      <AppText style={styles.tip}>• 인증된 정보로 휴대전화번호가 자동 적용됩니다.</AppText>     
      <AppText style={styles.tip}>• 생년월일 수정을 원하시면 고객센터로 문의바랍니다.</AppText>



      <AppText style={styles.label}>주소</AppText>
      <View style={styles.addressRow}>
        <TextInput style={styles.addressInput} value={formData.address} editable={false} />
        <TouchableOpacity style={styles.addressSearchButton} onPress={handleAddressSearch}>
          <AppText style={styles.addressSearchText}>검색</AppText>
        </TouchableOpacity>
              {/* 주소 모달  */}
      {showAddressModal && (
        <Modal visible transparent animationType="fade">
          <AddressSearchModal
            onSelect={(addr, code) => {
              setFormData(prev =>({
                ...prev,
                address : addr,
                bcode : code
              }));
            }}
            onClose={() => setShowAddressModal(false)}
          />
        </Modal>
      )}
      </View>

      <AppText style={styles.label}>주거 유형</AppText>
      <View style={styles.residenceContainer}>
        <View style={styles.checkboxItem}>
          <CustomCheckbox
            checked={formData.residenceType === 'HOUSE_VILLA'}
            onToggle={() => setFormData(prev =>
              ({...prev,
              residenceType :'HOUSE_VILLA'
             }))}
          />
          <AppText style={styles.residenceLabel}>빌라/주택</AppText>
        </View>
        <View style={styles.checkboxItem}>
          <CustomCheckbox
            checked={formData.residenceType === 'APT_OFFICETEL'}
            onToggle={() => setFormData(prev =>
              ({ ...prev,
                residenceType : 'APT_OFFICETEL'
              }))}
          />
          <Text style={styles.residenceLabel}>아파트/오피스텔</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.updateButtonText}>수정</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditUserInfo;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: wp('5%'),
  },
  sectionTitle: {
    color: '#006831',
    fontSize: wp('4.5%'),
    fontWeight: '700',
    marginTop: hp('1%'),
    marginBottom: hp('1.5%'),
  },
  label: {
    marginTop: hp('2.5%'),
    marginBottom: hp('1%'),
    fontSize: wp('3.8%'),
    color: '#000',
  },
  value: {
    marginTop: hp('2.5%'),
    fontSize: wp('3.8%'),
    color: '#006831',
  },
  tip: {
    fontSize: wp('3.2%'),
    color: '#000',
    marginTop: hp('1%'),
  },
  verifyButton: {
    backgroundColor: '#fff',
    borderColor: '#C8F589',
    borderWidth: 2,
    borderRadius: wp('1.5%'),
    height: hp('6%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1%'),
  },
  verifyButtonText: {
    fontWeight: '700',
    fontSize: wp('3.8%'),
  },
  birthButton: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: wp('1%'),
    height: hp('6%'),
    justifyContent: 'center',
    paddingHorizontal: wp('3%'),
    marginTop: hp('1%'),
  },
  birthText: {
    fontSize: wp('3.8%'),
    color: '#000',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarWrapper: {
    backgroundColor: '#fff',
    borderRadius: wp('2%'),
    padding: wp('5%'),
    width: '90%',
  },
  calendarCloseBtn: {
    marginTop: hp('1%'),
    alignSelf: 'flex-end',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: wp('1%'),
    height: hp('6%'),
    flex: 1,
    color: '#000',
    paddingHorizontal: wp('3%'),
  },
  addressSearchButton: {
    borderWidth: 1,
    borderColor: '#5da000',
    borderRadius: wp('7%'),
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('4%'),
    marginLeft: wp('2.5%'),
  },
  addressSearchText: {
    color: '#5da000',
    fontWeight: '700',
    fontSize: wp('3.5%'),
  },
  residenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: wp('1.2%'),
    padding: wp('3%'),
    marginTop: hp('1.5%'),
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  residenceLabel: {
    marginLeft: wp('1.5%'),
    fontSize: wp('3.5%'),
    color: '#898989',
  },
  updateButton: {
    backgroundColor: '#C8F589',
    borderRadius: wp('2%'),
    height: hp('6.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('4%'),
  },
  updateButtonText: {
    fontWeight: '700',
    fontSize: wp('4.2%'),
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
