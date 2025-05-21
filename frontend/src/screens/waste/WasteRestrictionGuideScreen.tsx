import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const WasteRestrictionGuideScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>배출 제한 가이드</Text>
        <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* 경고 박스 */}
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          ❗ 배출 제한 품목은 무단 투기 시{'\n'}과태료 부과 대상입니다.
        </Text>
      </View>

      {/* 공통 금지 품목 */}
      <Text style={styles.sectionTitle}>공통 금지 품목</Text>
      <View style={styles.textBlock}>
        <Text style={styles.listText}>• 냉장고 (가전 폐기물)</Text>
        <Text style={styles.listText}>• 세탁기 (가전 폐기물)</Text>
        <Text style={styles.listText}>• 폐가구 (대형 폐기물 신청 필요)</Text>
        <Text style={styles.listText}>• 건축자재 (별도 처리 대상)</Text>
        <Text style={styles.listText}>• 페인트통 (유해 폐기물 지정)</Text>
      </View>

      <View style={styles.separator} />

      {/* 지역 추가 규정 */}
      <Text style={styles.sectionTitle}>내 지역 추가 규정 - 서울시 강남구</Text>
      <View style={styles.textBlock}>
        <Text style={styles.listText}>• 대형 가전제품은 방문수거 신청 필수</Text>
        <Text style={styles.listText}>• 음식물 쓰레기 : 3L/5L 전용봉투 사용</Text>
        <Text style={styles.listText}>• 폐건전지 : 동주민센터 수거함 이용</Text>
      </View>

      {/* 버튼 */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>구청 폐기물 정책 보기</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default WasteRestrictionGuideScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
    paddingTop: hp('4%'),
  },
  header: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: hp('2%'),
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: '700',
    color: '#000',
  },
  warningBox: {
    backgroundColor: '#f87171', // red-400
    padding: wp('4%'),
    borderRadius: wp('2%'),
    marginTop: hp('3%'),
    marginBottom: hp('2%'),
  },
  warningText: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: '#000',
    lineHeight: hp('3%'),
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
    marginTop: hp('4%'),
    marginBottom: hp('1.5%'),
  },
  textBlock: {
    paddingLeft: wp('2%'),
  },
  listText: {
    fontSize: wp('4%'),
    color: '#000',
    marginBottom: hp('1%'),
  },
  button: {
    backgroundColor: '#a3e635', // lime-400
    paddingVertical: hp('2.5%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginVertical: hp('5%'),
  },
  buttonText: {
    fontSize: wp('4.5%'),
    fontWeight: '700',
    color: '#000',
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: hp('2%'),
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: wp('2%'),
  },
  closeText: {
    fontSize: wp('4.5%'),
    color: '#000',
  },
});