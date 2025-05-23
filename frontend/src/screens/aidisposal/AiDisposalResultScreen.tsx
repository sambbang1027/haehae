import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const AiDisposalResultScreen = () => {
  return (
    <View style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>배출 제한 가이드</Text>
        <Text style={styles.close}>✕</Text>
      </View>

      {/* 현재 위치 */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>현재 위치 : 서울시 강남구</Text>
      </View>

      {/* 인식 결과 */}
      <View style={styles.resultBox}>
        <Text style={styles.resultTitle}>
          <Text style={styles.highlight}>PET</Text>
          <Text style={styles.resultTitle}> 병</Text>
          으로 인식했습니다.
        </Text>

        <Text style={styles.resultDescription}>
          내용물을 비우고 깨끗이 헹굽니다.{"\n"}
          라벨 및 뚜껑을 제거합니다.{"\n"}
          (재질에 따라 분리){"\n"}
          플라스틱 수거함에 배출합니다.
        </Text>
      </View>

      {/* 주의사항 */}
      <View style={styles.warningBox}>
        <Text style={styles.warningTitle}>주의사항</Text>
        <Text style={styles.warningContent}>
          기름이나 음식물 등으로 심하게 오염된 플라스틱은
          일반 쓰레기로 배출해야 합니다.
        </Text>
      </View>

      {/* 링크 / 버튼 */}
      <TouchableOpacity>
        <Text style={styles.linkText}>우리 동네 분리배출 정책 바로가기</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.retakeButton}>
        <Text style={styles.retakeButtonText}>다시 인식하기</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AiDisposalResultScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('5%'),
  },
  header: {
    height: hp('8%'),
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  close: {
    position: 'absolute',
    right: wp('5%'),
    top: '50%',
    transform: [{ translateY: -wp('3%') }],
    fontSize: wp('5.5%'),
    color: '#000',
  },
  locationBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('3%'),
    marginTop: hp('3%'),
  },
  locationText: {
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: '500',
  },
  resultBox: {
    backgroundColor: '#DBEAFE',
    padding: wp('5%'),
    borderRadius: 8,
    marginBottom: hp('4%'),
  },
  resultTitle: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp('2%'),
  },
  highlight: {
    color: '#6366F1',
  },
  resultDescription: {
    fontSize: wp('4%'),
    color: '#000',
    lineHeight: hp('3%'),
  },
  warningBox: {
    backgroundColor: '#D9F99D',
    padding: wp('4%'),
    borderRadius: 8,
    marginBottom: hp('3%'),
  },
  warningTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: '#000',
  },
  warningContent: {
    fontSize: wp('4%'),
    color: '#000',
  },
  linkText: {
    color: '#6366F1',
    fontWeight: 'bold',
    fontSize: wp('4.3%'),
    textAlign: 'center',
    marginBottom: hp('3%'),
  },
  retakeButton: {
    backgroundColor: '#A3E635',
    paddingVertical: hp('2%'),
    borderRadius: 6,
    alignItems: 'center',
  },
  retakeButtonText: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
});