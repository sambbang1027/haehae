import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CategoryItem = ({ label, route }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <Text style={styles.item}>{label}</Text>
    </TouchableOpacity>
  );
};

const Category = () => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/icons/recycle.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>분리수거</Text>
          </View>
          <CategoryItem label="분리수거 캘린더" route="RecycleCalendar" />
          <CategoryItem label="대형폐기물 신청" route="BulkWaste" />
          <CategoryItem label="AI 분리배출 가이드" route="AIGuide" />
          <CategoryItem label="배출 제한 가이드" route="RestrictionGuide" />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/icons/map.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>지도</Text>
          </View>
          <CategoryItem label="수거함 위치 탐색" route="BinLocator" />
          <CategoryItem label="플로깅 장소" route="PloggingPlaces" />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/icons/community.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>커뮤니티</Text>
          </View>
          <CategoryItem label="봉사/클래스 모집" route="VolunteerClass" />
          <CategoryItem label="중고 나눔 마켓" route="Marketplace" />
          <CategoryItem label="우리 동네 게시판" route="LocalBoard" />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/icons/point.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>포인트</Text>
          </View>
          <CategoryItem label="포인트 사용 내역" route="PointRecord" />
          <CategoryItem label="포인트 상점" route="PointShop" />
        </View>
        <View style={styles.divider} />
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Image source={require('../../assets/icons/challenge.png')} style={styles.icon} />
            <Text style={styles.sectionTitle}>챌린지</Text>
          </View>
          <CategoryItem label="일일/주간 미션" route="DayWeekMission" />
          <CategoryItem label="챌린지 기록" route="Marketplace" />
        </View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  item: {
    fontSize: 16,
    color: '#000',
    paddingVertical: 6,
    paddingLeft: 32,
  },
  icon: {
    width: 24,
    height: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 16,
  }
  
});

export default Category;
