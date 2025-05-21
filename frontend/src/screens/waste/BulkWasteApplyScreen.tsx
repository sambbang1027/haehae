import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types'; // 정확한 경로로 수정

type Props = NativeStackScreenProps<RootStackParamList, 'BulkWasteApply'>;


const BulkWasteApplyScreen = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 상단 타이틀 */}
        <Text style={styles.title}>대형 폐기물 신청</Text>

        {/* 위치 확인 버튼 */}
        <TouchableOpacity style={styles.locationBtn}>
          <Text style={styles.locationText}>현재 위치로 자동 확인</Text>
        </TouchableOpacity>

        {/* 주소 라벨 */}
        <Text style={styles.label}>주소</Text>

        {/* 주소 입력 필드 */}
        <TextInput
          style={styles.addressInput}
          value="경기도 군포시 금당로 17번길 9"
          editable={false} // 주소 API 미적용 상태
        />
        <Text style={styles.helperText}>도로명, 건물번호 까지 입력해주세요.</Text>

        {/* 지도 표시 박스 (모형) */}
        <View style={styles.mapBox}>
          <Text style={styles.mapText}>[ 지도 영역 Placeholder ]</Text>
        </View>

        {/* 다음 버튼 */}
        <TouchableOpacity 
        style={styles.nextBtn}
        onPress={() => navigation.navigate('WasteApplyWebViewScreen')}>
          <Text style={styles.nextText}>다음</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: wp('6%'),
  },
  title: {
    fontSize: wp('5%'),
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  locationBtn: {
    backgroundColor: '#A3E635',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  locationText: {
    fontSize: wp('4%'),
    fontWeight: '600',
    color: '#000',
  },
  label: {
    fontSize: wp('3.5%'),
    fontWeight: '500',
    marginBottom: hp('1%'),
  },
  addressInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: wp('2%'),
    padding: wp('3%'),
    fontSize: wp('4%'),
    backgroundColor: '#F9FAFB',
    marginBottom: hp('0.8%'),
  },
  helperText: {
    fontSize: wp('3%'),
    color: '#6B7280',
    marginBottom: hp('2%'),
  },
  mapBox: {
    height: hp('25%'),
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
    backgroundColor: '#F3F4F6',
  },
  mapText: {
    fontSize: wp('3.5%'),
    color: '#9CA3AF',
  },
  nextBtn: {
    backgroundColor: '#A3E635',
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
  },
  nextText: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#000',
  },
});

export default BulkWasteApplyScreen;
