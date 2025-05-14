import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomCheckbox from '../../components/layouts/CustomCheckBox';
import dayjs from 'dayjs';
import DatePicker from 'react-native-date-picker';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

const EditUserInfo = () => {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [residenceType, setResidenceType] = useState<string>('apt');
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<Date>(new Date());

  const handleAddressSearch = () => {
    console.log('주소 검색 실행');
  };

  const handleVerify = () => {
    console.log('본인인증 실행');
  };

  const handleUpdate = () => {
    console.log('회원정보 수정 완료');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>회원정보</Text>

      <View style={styles.infoRow}>
        <Text style={styles.label}>이름</Text>
        <Text style={styles.value}>김정우</Text>
      </View>

      <View style={styles.infoRow}>
        <Text style={styles.label}>휴대전화번호</Text>
        <Text style={styles.value}>010-1***-2***</Text>
      </View>

      <TouchableOpacity style={styles.verifyButton} onPress={handleVerify}>
        <Text style={styles.verifyButtonText}>본인인증</Text>
      </TouchableOpacity>
      <Text style={styles.tip}>• 인증된 정보로 휴대전화번호가 자동 적용됩니다.</Text>

      <Text style={styles.label}>생년월일</Text>
      <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.birthButton}>
        <Text style={styles.birthText}>{dayjs(birthDate).format('YYYY년 MM월 DD일')}</Text>
      </TouchableOpacity>

      <Modal visible={showDatePicker} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.calendarWrapper}>
            <DatePicker
              date={birthDate}
              mode="date"
              maximumDate={new Date()}
              onDateChange={(date: Date) => setBirthDate(date)}
            />
            <TouchableOpacity onPress={() => setShowDatePicker(false)} style={styles.calendarCloseBtn}>
              <Text style={{ fontWeight: 'bold' }}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>주소</Text>
      <View style={styles.addressRow}>
        <TextInput style={styles.addressInput} placeholder="주소" editable={false} />
        <TouchableOpacity style={styles.addressSearchButton} onPress={handleAddressSearch}>
          <Text style={styles.addressSearchText}>검색</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>주거 유형</Text>
      <View style={styles.residenceContainer}>
        <View style={styles.checkboxItem}>
          <CustomCheckbox
            checked={residenceType === 'villa'}
            onToggle={() => setResidenceType('villa')}
          />
          <Text style={styles.residenceLabel}>빌라/주택</Text>
        </View>
        <View style={styles.checkboxItem}>
          <CustomCheckbox
            checked={residenceType === 'apt'}
            onToggle={() => setResidenceType('apt')}
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
    padding: 20,
  },
  sectionTitle: {
    color: '#006831',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 30,
    marginBottom: 10,
  },
  label: {
    marginTop: 25,
    marginBottom: 6,
    fontSize: 15,
    color: '#000',
  },
  value: {
    fontSize: 15,
    color: '#006831',
  },
  tip: {
    fontSize: 13,
    color: '#000',
    marginTop: 10,
  },
  verifyButton: {
    backgroundColor: '#fff',
    borderColor: '#C8F589',
    borderWidth: 2,
    borderRadius: 5,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  verifyButtonText: {
    fontWeight: '700',
    fontSize: 15,
  },
  birthButton: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 3,
    height: 55,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginTop: 8,
  },
  birthText: {
    fontSize: 15,
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
    borderRadius: 10,
    padding: 20,
    width: '90%',
  },
  calendarCloseBtn: {
    marginTop: 10,
    alignSelf: 'flex-end',
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 3,
    height: 55,
    flex: 1,
    paddingHorizontal: 10,
  },
  addressSearchButton: {
    borderWidth: 1,
    borderColor: '#5da000',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 10,
  },
  addressSearchText: {
    color: '#5da000',
    fontWeight: '700',
  },
  residenceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#959595',
    borderRadius: 4,
    padding: 10,
    marginTop: 10,
  },
  checkboxItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  residenceLabel: {
    marginLeft: 5,
    fontSize: 15,
    color: '#898989',
  },
  updateButton: {
    backgroundColor: '#C8F589',
    borderRadius: 5,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  updateButtonText: {
    fontWeight: '700',
    fontSize: 17,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
