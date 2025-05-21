import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ploggingCourses = [
  { name: '대지천 산책로', info: '2.5km  쉬움  40분' },
  { name: '봉은사길 코스', info: '3.8km  보통  1시간' },
  { name: '양재천 따라 걷기', info: '4.2km  쉬움  1시간 10분' },
  { name: '탄천 자전거길 (일부)', info: '5.1km  약간 어려움  1시간 30분' },
];

const PloggingPlaceScreen = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: hp('10%') }}>
      {/* 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>플로깅 장소</Text>
      </View>

      {/* 현재 위치 */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>현재 위치 : 서울시 강남구</Text>
      </View>

      {/* 지도 placeholder 박스 */}
      <View style={styles.mapPlaceholderBox}>
        <Text style={styles.mapPlaceholderText}>[ 지도 영역 Placeholder ]</Text>
      </View>

      {/* 코스 리스트 제목 */}
      <Text style={styles.listTitle}>주변 플로깅 코스 리스트</Text>

      {/* 리스트 박스 */}
      <View style={styles.listBox}>
        {ploggingCourses.map((course, idx) => (
          <View key={idx} style={styles.listItem}>
            <Text style={styles.courseName}>• {course.name}</Text>
            <Text style={styles.courseInfo}>{course.info}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default PloggingPlaceScreen;

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
    marginBottom: hp('2%'),
    alignItems: 'center',
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
  mapPlaceholderBox: {
    width: '100%',
    height: hp('30%'),
    backgroundColor: '#f3f4f6',
    borderRadius: wp('3%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  mapPlaceholderText: {
    fontSize: wp('3.8%'),
    color: '#9ca3af',
  },
  listTitle: {
    fontSize: wp('4%'),
    fontWeight: '300',
    marginBottom: hp('1.5%'),
  },
  listBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingVertical: hp('1.8%'),
    paddingHorizontal: wp('4%'),
  },
  courseName: {
    fontSize: wp('4%'),
    fontWeight: '300',
    color: '#000',
  },
  courseInfo: {
    fontSize: wp('3.5%'),
    fontWeight: '300',
    color: '#666',
  },
});