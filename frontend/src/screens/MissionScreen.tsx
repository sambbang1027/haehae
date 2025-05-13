import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface Mission {
  id: number;
  type: 'weekly' | 'daily';
  title: string;
  reward: string;
  status?: '완료' | '진행중';
  duration?: string; // 주간 미션 기간
  date?: string;     // 일일 미션 날짜
}

const MissionScreen: React.FC = () => {
  const [weeklyMissions, setWeeklyMissions] = useState<Mission[]>([
    { id: 1, type: 'weekly', title: '주 5회 봉사 활동 참여', reward: '1,000p' },
    { id: 4, type: 'weekly', title: '커뮤니티 글 1회 작성', reward: '300p', duration: '(2025.04.27 ~ 05.03)' },
    { id: 5, type: 'weekly', title: '나눔 거래 1회 이상', reward: '300p' },
    { id: 7, type: 'weekly', title: '새로운 봉사 게시글 3개 이상 확인', reward: '500p', duration: '(2025.05.05 ~ 05.11)' },
    { id: 8, type: 'weekly', title: '주간 미션 추가 1', reward: '100p', duration: '(2025.05.12 ~ 05.18)' },
    { id: 9, type: 'weekly', title: '주간 미션 추가 2', reward: '200p', duration: '(2025.05.12 ~ 05.18)' },
  ]);
  const [dailyMissions, setDailyMissions] = useState<Mission[]>([
    { id: 2, type: 'daily', title: '우리 동네 쓰레기 줍기 봉사 1회 참여', reward: '', status: '완료', date: '(2025.04.28)' },
    { id: 3, type: 'daily', title: '질문 답변 2회 이상 참여', reward: '250p' },
    { id: 6, type: 'daily', title: '오늘의 분리수거 인증샷 올리기', reward: '100p' },
    { id: 10, type: 'daily', title: '일일 미션 추가 1', reward: '50p', date: '(2025.05.13)' },
    { id: 11, type: 'daily', title: '일일 미션 추가 2', reward: '75p', date: '(2025.05.13)' },
  ]);
  const [selectedTab, setSelectedTab] = useState<'weekly' | 'daily'>('daily'); // 초기 탭 설정

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image style={styles.sproutIcon} source={require('../assets/sprout.png')} />
        <Text style={styles.currentGradeTitle}>현재 킹도훈님의 등급</Text>
        <Text style={styles.currentGrade}>새싹</Text>
        <Text style={styles.remainingPoints}>꽃 등급까진 3000p 남았습니다.</Text>
      </View>

      {/* 탭 UI */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'daily' && styles.activeTab]}
          onPress={() => setSelectedTab('daily')}
        >
          <Text style={[styles.tabText, selectedTab === 'daily' && styles.activeTabText]}>일일 미션</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabItem, selectedTab === 'weekly' && styles.activeTab]}
          onPress={() => setSelectedTab('weekly')}
        >
          <Text style={[styles.tabText, selectedTab === 'weekly' && styles.activeTabText]}>주간 미션</Text>
        </TouchableOpacity>
      </View>

      {/* 주간 미션 목록 렌더링 (선택된 탭이 'weekly'일 때만) */}
      {selectedTab === 'weekly' && (
        <View style={styles.missionListContainer}>
          {weeklyMissions.map((mission, index) => (
            <View key={mission.id} style={styles.missionItem}>
              <Text style={styles.missionTitle}>{mission.title}</Text>
              <Text style={styles.missionReward}>{mission.reward}</Text>
              {mission.duration && <Text style={styles.missionDetail}>{mission.duration}</Text>}
              {index < weeklyMissions.length - 1 && <View style={styles.missionDivider} />}
            </View>
          ))}
        </View>
      )}

      {/* 일일 미션 목록 렌더링 (선택된 탭이 'daily'일 때만) */}
      {selectedTab === 'daily' && (
        <View style={styles.missionListContainer}>
          {dailyMissions.map((mission, index) => (
            <View key={mission.id} style={styles.missionItem}>
              <Text style={styles.missionTitle}>{mission.title}</Text>
              <Text style={styles.missionReward}>{mission.reward}</Text>
              {mission.status && <Text style={styles.missionStatus}>{mission.status}</Text>}
              {mission.date && <Text style={styles.missionDetail}>{mission.date}</Text>}
              {index < dailyMissions.length - 1 && <View style={styles.missionDivider} />}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingBottom: hp('10%'),
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: hp('10%'),
    paddingBottom: hp('5%'),
  },
  sproutIcon: {
    width: wp('20%'),
    height: wp('20%'),
    aspectRatio: 1,
    marginBottom: hp('1%'),
  },
  currentGradeTitle: {
    color: '#000000',
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    opacity: 0.5,
    marginBottom: hp('0.5%'),
  },
  currentGrade: {
    color: 'rgba(147, 235, 24, 0.51)',
    fontSize: wp('9%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  remainingPoints: {
    color: '#000000',
    fontSize: wp('4%'),
    fontWeight: '400',
    opacity: 0.5,
  },
  // 탭 UI 스타일
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('-3%'),
    marginBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
  },
  tabItem: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  activeTab: {
    borderBottomColor: 'rgba(147, 235, 24, 0.8)',
  },
  tabText: {
    fontSize: wp('5%'),
    fontFamily: 'Inter-Regular',
    fontWeight : 'bold',
    color: '#888',
  },
  activeTabText: {
    color: 'rgba(147, 235, 24, 0.8)',
    fontWeight: 'bold',
  },
  // 미션 목록 스타일
  missionListContainer: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('2%'),
  },
  missionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: hp('1.5%'),
  },
  missionTitle: {
    color: '#000000',
    fontSize: wp('4.3%'),
    fontWeight: '400',
  },
  missionReward: {
    color: '#000000',
    fontSize: wp('4.3%'),
    fontWeight: 'bold',
    marginLeft: wp('5%'),
  },
  missionStatus: {
    color: '#bebebe',
    fontSize: wp('4.3%'),
    fontWeight: '400',
    marginLeft: wp('5%'),
  },
  missionDetail: {
    color: '#bebebe',
    fontSize: wp('4%'),
    fontWeight: '400',
    marginTop: hp('0.5%'),
  
  },
  missionDivider: {
    borderBottomWidth: 1,
    borderBottomColor: '#bcbcbc',
    marginTop: hp('1%'),
  },
});

export default MissionScreen;