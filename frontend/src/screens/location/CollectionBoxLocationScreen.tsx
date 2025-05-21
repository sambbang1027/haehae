import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const locations = [
  { label: '강남역 1번 출구 앞 (500m)' },
  { label: '코엑스 동문 (1.2km)' },
  { label: '봉은사역 3번 출구 (800m)' },
  { label: '삼성중앙역 4번 출구 (950m)' },
  { label: '선릉역 5번 출구 (1.5km)' },
];

const CollectionBoxLocationScreen = () => {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>수거함 위치 탐색</Text>
        {/* 닫기 아이콘은 생략 가능 */}
      </View>

      {/* 위치 표시 바 */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>현재 위치 : 서울시 강남구</Text>
      </View>

      {/* 수거함 리스트 */}
      <View style={styles.boxList}>
        {locations.map((item, idx) => (
          <View key={idx} style={styles.itemRow}>
            <Text style={styles.itemText}>• {item.label}</Text>
          </View>
        ))}
      </View>

      {/* 테두리 박스 (디자인용) */}
      <View style={styles.borderBox}>
        <Text style={styles.mapText}>[ 지도 영역 Placeholder ]</Text>
      </View>

    </ScrollView>
  );
};

export default CollectionBoxLocationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('4%'),
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: hp('2%'),
    marginBottom: hp('2%'),
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  locationBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: wp('8%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginVertical: hp('2%'),
  },
  locationText: {
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#000',
  },
  boxList: {
    marginTop: hp('2%'),
  },
  itemRow: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1.5%'),
  },
  itemText: {
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: '300',
  },
  borderBox: {
    marginTop: hp('4%'),
    marginBottom: hp('8%'),
    height: hp('45%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  mapText: {
    fontSize: wp('4%'),
    color: '#9CA3AF',
    textAlign: 'center',
  },
});