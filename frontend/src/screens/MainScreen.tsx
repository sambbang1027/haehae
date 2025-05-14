import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

const MainScreen = () => {
  const navigation = useNavigation();
  const [day, setDay] = useState('');
  const [plasticType, setPlasticType] = useState('');

  useEffect(() => {
    const today = new Date();
    const dayIndex = today.getDay();
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const currentDay = days[dayIndex];
    setDay(currentDay);

    if (currentDay === '토' || currentDay === '일') {
      setPlasticType('휴무');
    }
  }, []);

  const handleRecycleCalendarPress = () => {
    navigation.navigate('RecycleCalendar');
  }

  const handleMissionCardPress = () => {
    navigation.navigate('MissionScreen');
  };

  const handleAlarmPress = () => {
    navigation.navigate('Alarm');
  };
7
    const handleRewardPress = () => {
    navigation.navigate('RewardList');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <View style={styles.locationContainer}>
          <Image style={styles.locationIcon} source={require('../assets/location-icon.png')} />
          <Text style={styles.locationText}>서울특별시 강남구 xx로</Text>
        </View>
        <TouchableOpacity onPress={handleAlarmPress}>
          <Image style={styles.alarmIcon} source={require('../assets/alarm-icon.png')} />
        </TouchableOpacity>
      </View>

      
      <TouchableOpacity onPress={handleRecycleCalendarPress}>  
        <Image
          style={styles.mainImage}
          source={require('../assets/main-Image.png')}
        />
        <Text style={styles.dayText}>{day}요일</Text>
        <Text style={styles.dayRecycleText}>{plasticType || '“플라스틱”' + ' 입니다.'}</Text>
 7         </TouchableOpacity>

      <TouchableOpacity style={styles.pointCard}>
        <Text style={styles.pointTitle}>도훈님의 포인트</Text>
        <Text style={styles.pointValue}>1,080 P</Text>
        <View style={styles.pointDetailContainer}>
          <Text style={styles.pointDetail}>자세히 보러가기</Text>
        </View>
          <Image
            style={styles.pointCoinIcon}
            source={require('../assets/coin.png')} // 예시 이미지
          />
      </TouchableOpacity>

      <View style={styles.row}>
       <TouchableOpacity style={styles.missionCard} onPress={handleMissionCardPress}> {/* TouchableOpacity로 감싸고 onPress 이벤트 추가 */}
          <Text style={styles.missionTitle}>환경 미션</Text>
          <View>
            <Text style={styles.missionDescription}>일일/주간</Text>
            <Text style={styles.missionDescription}>미션하러 가기</Text>
          </View>
          <Image style={styles.missionImage} source={require('../assets/mission-icon.png')} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.communityBoard}>
          <Text style={styles.communityTitle}>우리 동네</Text>
          <View>
          <Text style={styles.communityText}>우리동네</Text>
          <Text style={styles.communityText}>커뮤니티</Text>
          </View>
          <Image style={styles.communityImage} source={require('../assets/village.png')} // 예시 이미지
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <TouchableOpacity style={styles.guideCard}>
          <Text style={styles.guideTitle}>분리수거 가이드</Text>
          <View>
            <Text style={styles.guideSubtitle}>사진 촬영</Text>
            <Text style={styles.guideSubtitle}>분리 배출</Text>
          </View>
          <Image style={styles.guideCameraIcon} source={require('../assets/camera.png')} // 예시 이미지
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.collectionCard} onPress={handleRewardPress}>
          <Text style={styles.collectionTitle}>수거함 위치</Text>
          <View>
          <Text style={styles.collectionSubtitle}>우리 동네 의류 </Text>
          <Text style={styles.collectionSubtitle}>및 건전지 등 위치</Text>
          </View>
          <Image style={styles.collectionLocationIcon} source={require('../assets/placeholder.png')} // 예시 이미지
          />
        </TouchableOpacity>
      </View>

      {/* <View style={styles.bottomNavigation}>
        <View style={styles.navItem}>
          <Image style={styles.navIcon} source={require('../assets/material-symbols_menu-rounded.png')} />
          <Text style={styles.navText}>카테고리</Text>
        </View>
        <View style={styles.navItem}>
          <Image style={styles.navIcon} source={require('../assets/material-symbols_menu-rounded.png')} />
          <Text style={styles.navText}>커뮤니티</Text>
        </View>
        <View style={styles.navItem}>
          <Image style={styles.navIconCenter} source={require('../assets/material-symbols_menu-rounded.png')} />
        </View>
        <View style={styles.navItem}>
          <Image style={styles.navIcon} source={require('../assets/material-symbols_menu-rounded.png')} />
          <Text style={styles.navText}>분리수거</Text>
        </View>
        <View style={styles.navItem}>
          <Image style={styles.navIcon} source={require('../assets/material-symbols_menu-rounded.png')} />
          <Text style={styles.navText}>마이</Text>
        </View>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingBottom: hp('10%'),
    paddingHorizontal: wp('2.5%'),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: hp('5%'),
    paddingHorizontal: wp('2.5%'),
  },
   locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 'auto', // 내용물에 맞춰 너비 자동 조정
    borderWidth: 2, // 테두리 두께 조정
    borderColor: '#c0c0c0', // 테두리 색상
    borderRadius: 25, // 둥근 테두리 정도 (원하는 값으로 조절)
    paddingVertical: hp('0.1%'), // 위아래 패딩 (원하는 값으로 조절)
    paddingHorizontal: wp('7%'), // 좌우 패딩 (원하는 값으로 조절) - 아이콘이 잘리지 않도록 조정
    alignSelf: 'flex-start', // 부모 왼쪽으로 정렬
    marginLeft: wp('13%'), // 원하는 만큼 왼쪽에서 간격 띄우기
    height: hp('6%'),
  },
  locationIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('1%'),
    aspectRatio: 1,
  },
  locationText: {
    fontSize: wp('4%'),
  },
  alarmIcon: {
    width: wp('8%'),
    height: wp('8%'),
    aspectRatio: 1,
    marginRight : wp('5%')
  },
  mainImage: {
    width: '100%',
    height: hp('20%'),
    marginTop: hp('2%'),
    borderRadius: wp('5%'),
  },
  dayText: {
    color: '#ffffff',
    fontSize: wp('6%'),
    fontWeight: 'bold',
    position: 'absolute',
    top: hp('9%'),
    left: wp('9%'),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  dayRecycleText: {
    color: '#ffffff',
    fontSize: wp('9%'),
    fontWeight: 'bold',
    position: 'absolute',
    top: hp('13%'),
    left: wp('7%'),
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
 pointCard: {
    borderColor: 'rgba(147, 235, 24, 0.5)',
    borderWidth: 1.2,
    borderRadius: 15,
    marginTop: hp('3%'),
    padding: wp('5%'),
    flexDirection: 'column',
    alignItems: 'flex-start',
    position: 'relative', // pointCoinIcon의 absolute 포지셔닝 기준점
    overflow: 'hidden', // borderRadius가 잘리지 않도록 추가
  },
  pointTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  pointValue: {
    fontSize: wp('7%'),
    fontWeight: 'bold',
    color: 'black', 
    marginTop: hp('1%'),
  },
  pointDetailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp('0.5%'),
  },
  pointDetail: {
    fontSize: wp('3.5%'),
    color: '#777',
    marginRight: wp('2%'),
  },
  pointCoinIcon: {
    width: wp('20%'), // 아이콘 크기 조정
    height: wp('20%'), // 아이콘 크기 조정
    aspectRatio: 1,
    position: 'absolute', // 자유로운 위치 설정
    top: -wp('-7%'), // 위로 이동 (원하는 값으로 조절)
    right: -wp('-15%'), // 오른쪽으로 이동 (원하는 값으로 조절)
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },
  missionCard: {
    borderColor: 'rgba(147, 235, 24, 0.5)',
    borderWidth: 1.2,
    borderRadius: wp('5%'),
    width: wp('45.5%'),
    padding: wp('4%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: hp('16.5%'),
  },
  missionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },

  missionDescription: {
    fontSize: wp('3.5%'),
    color: '#555',
    top : hp('-0.5%')
  },
  missionImage: {
    width: wp('15%'),
    height: wp('15%'),
    position: 'absolute',
    right: wp('1%'),
    top: wp('12%'),
    aspectRatio: 1,
  },
  communityBoard: {
    borderColor: 'rgba(147, 235, 24, 0.5)',
    borderWidth: 1.2,
    borderRadius: wp('5%'),
    width: wp('45.5%'),
    padding: wp('4%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: hp('16.5%'),
  },
  communityTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  communityText: {
    fontSize: wp('3.5%'),
    color: '#555',
    top : hp('-0.5%')
  },
  communityImage: {
    width: wp('15%'),
    height: wp('15%'),
    position: 'absolute',
    bottom: wp('3%'),
    right: wp('3%'),
    top: wp('12%'),
    aspectRatio: 1,
  },
  guideCard: {
    borderColor: 'rgba(147, 235, 24, 0.5)',
    borderWidth: 1.2,
    borderRadius: wp('5%'),
    width: wp('45.5%'),
    padding: wp('4%'),
    marginTop: hp('0.2%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: hp('16%'),
  },
  guideTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  guideSubtitle: {
    fontSize: wp('3.5%'),
    color: '#555',
    top : hp('-0.5%')
  },
  guideCameraIcon: {
    width: wp('15%'),
    height: wp('15%'),
    position: 'absolute',
    bottom: wp('3%'),
    right: wp('3%'),
    top: wp('12%'),
    aspectRatio: 1,
  },
  collectionCard: {
    borderColor: 'rgba(147, 235, 24, 0.5)',
    borderWidth: 1.2,
    borderRadius: wp('5%'),
    width: wp('45.5%'),
    padding: wp('4%'),
    marginTop: hp('0.1%'),
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: hp('16%'),
  },
  collectionTitle: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: '#333',
  },
  collectionSubtitle: {
    fontSize: wp('3.5%'),
    color: '#555',
    top : hp('-0.5%')
  },
  collectionLocationIcon: {
    width: wp('15%'),
    height: wp('15%'),
    position: 'absolute',
    bottom: wp('3%'),
    right: wp('3%'),
    top: wp('12%'),
    aspectRatio: 1,
  },
  // bottomNavigation: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-around',
  //   alignItems: 'center',
  //   position: 'absolute',
  //   bottom: 0,
  //   left: 0,
  //   right: 0,
  //   backgroundColor: '#f8f8f8',
  //   height: hp('8%'),
  //   borderTopWidth: 1,
  //   borderTopColor: '#eee',
  // },
  // navItem: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // navIcon: {
  //   width: wp('5%'),
  //   height: wp('5%'),
  //   aspectRatio: 1,
  //   tintColor: '#555',
  // },
  // navIconCenter: {
  //   width: wp('10%'),
  //   height: wp('10%'),
  //   aspectRatio: 1,
  //   tintColor: '#ffb300', // Sun icon color
  //   marginBottom: hp('1%'), // Adjust as needed
  // },
  // navText: {
  //   fontSize: wp('3%'),
  //   color: '#555',
  //   marginTop: hp('0.5%'),
  // },
});

export default MainScreen;