  import React, { useState, useEffect } from 'react';
  import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import api from '../../api/AxiosInstance';
  import { useUser } from '../../context/UserContext';


  interface Mission {
    id: number;
    previewMissionContent: string;
    previewMissionPoint: number;
    previewMissionType: 'WEEKLY' | 'DAILY';
    previewMissionCategory: 'string';
  }

  const MissionScreen = () => { 

    const [weeklyMissions, setWeeklyMissions] = useState<Mission[]>([]);
    const [dailyMissions, setDailyMissions] = useState<Mission[]>([
    ]);
    const [selectedTab, setSelectedTab] = useState<'weekly' | 'daily'>('daily');
    const {user, setUser} = useUser();
    const userId = user?.userId;


    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(()=> {
      checkMissionStauts();
      missionAxios();
    },[]);

    const missionAxios = async() => {
      try {
        const res = await api.get("previewMission/list");
        const weekly: Mission[] = [];
        const daily: Mission[] = [];

        res.data.forEach((mission :Mission) => {
          if(mission.previewMissionType == 'WEEKLY'){
            weekly.push(mission);
          }else{
            daily.push(mission);
          }
        });

        setWeeklyMissions(weekly);
        setDailyMissions(daily);
        
      } catch (error) {
        console.error("요청 실패:", error);
      }
    }

      const checkMissionStauts = async() => {
      try{
        const res = api.post(`mission/status/check/${userId}`)
        console.log(res);
      }catch(error){

        }
      }

    const showModal = () => {
      setIsModalVisible(true);
    };

  const hideModal = () => {
      setIsModalVisible(false);
    };

    return (
      <View style={{ flex: 1 }}>
      <ScrollView style={styles.container}
      contentContainerStyle={styles.contentContainerStyle}>
        {/* <Header/> */}
        <View style={styles.headerContainer}>
          <Image style={styles.sproutIcon} source={require('../../assets/images/sprout.png')} />
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
                <Text style={styles.missionTitle}>{mission.previewMissionContent}</Text>
              <TouchableOpacity onPress={showModal}> 
                <Text style={styles.missionReward}>{mission.previewMissionPoint}p</Text>
              </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* 일일 미션 목록 렌더링 (선택된 탭이 'daily'일 때만) */}
        {selectedTab === 'daily' && (
          <View style={styles.missionListContainer}>
            {dailyMissions.map((mission, index) => (
              <View key={mission.id} style={styles.missionItem}>
                <Text style={styles.missionTitle}>{mission.previewMissionContent}</Text>
              <TouchableOpacity onPress={showModal}>
                <Text style={styles.missionReward}>{mission.previewMissionPoint}p</Text>
              </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

      </ScrollView>
      {/* <Footer/> */}
      {isModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Image
              source={require('../../assets/images/reward-coin.png')} // 이미지 경로를 실제 경로로 변경
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>300p가 지급되었습니다.</Text>
            <TouchableOpacity style={styles.modalButton} onPress={hideModal}>
              <Text style={styles.modalButtonText}>확인</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      paddingBottom: hp('10%'),
    },
    contentContainerStyle : {
      paddingBottom: hp('1%'), // 임시로 큰 paddingBottom 설정
      minHeight: hp('100%'),
    },
    headerContainer: {
      alignItems: 'center',
      paddingTop: hp('3%'),
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
      marginTop: hp('1.3%'),
    },
    missionItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: hp('1.5%'),
      borderBottomWidth : hp('0.2%'),
      borderBottomColor: '#e0e0e0',
      marginBottom:hp('3%')
    },
    missionTitle: {
      color: '#000000',
      fontSize: wp('4%'),
      fontWeight: '400',
    },
    missionReward: {
      color: '#000000',
      fontSize: wp('4%'),
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

    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
      position: 'absolute', // 이 부분을 추가
      top: 0,                // 이 부분을 추가
      bottom: 0,             // 이 부분을 추가
      left: 0,               // 이 부분을 추가
      right: 0,              // 이 부분을 추가
    },
    modalContent: {
      backgroundColor: '#ffffff',
      borderRadius: 10,
      padding: wp('10%'),
      alignItems: 'center',
    },
    modalImage: {
      width: wp('20%'),
      height: wp('20%'),
      marginBottom: hp('2%'),
    },
    modalText: {
      fontSize: wp('5%'),
      marginBottom: hp('3%'),
      textAlign: 'center',
    },
    modalButton: {
      backgroundColor: 'rgba(147, 235, 24, 0.8)',
      paddingVertical: hp('1.5%'),
      paddingHorizontal: wp('8%'),
      borderRadius: 5,
    },
    modalButtonText: {
      fontSize: wp('4%'),
      fontWeight: 'bold',
    },

  });

  export default MissionScreen;