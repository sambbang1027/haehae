import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MyPageStackParamList } from '../../navigation/MyPageNavigator'; 

type Navigation = NativeStackNavigationProp<MyPageStackParamList, 'MyPage'>;

const CategoryItem = ({ label, route }: { label: string; route: string }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(route as never)}>
      <Text style={styles.menuItem}>{label}</Text>
    </TouchableOpacity>
  );
};

const MyPage = () => {
  const navigation = useNavigation<Navigation>();
  const handleLogout = () => {
    console.log('로그아웃 고고');
  };
  const goToSettings = () => {
    navigation.navigate('SettingPage');
  };
  const goToLevelInfo = () => {
    navigation.navigate('LevelInfo');
  };
  const goToPointRecord = () => {
    navigation.navigate('PointRecord');
  }

  return (
    <View style={styles.container}>

      {/* User Info */}
      <View style={styles.userSection}>
        <Image source={require('../../assets/icons/profile.png')} style={styles.avatar} />
        <Text style={styles.nickname}>닉네임</Text>
        <TouchableOpacity style={styles.settingIcon} onPress={goToSettings}>
          <Image source={require('../../assets/icons/setting.png')} style={styles.settingIcon} />
        </TouchableOpacity>
      </View>

      {/* Point and Level */}
      <View style={styles.pointLevel}>
        
          <TouchableOpacity style={styles.levelBox} onPress={goToLevelInfo}>
            <Image source={require('../../assets/icons/sprout_level.png')} style={styles.icon} />
            <Text style={styles.level}>새싹 등급</Text>
          </TouchableOpacity>

        <TouchableOpacity style={styles.pointBox} onPress={goToPointRecord}>
          <Image source={require('../../assets/icons/point-icon.png')} style={styles.icon} />
          <Text style={styles.points}>1,030P</Text>
        </TouchableOpacity>
   
      </View>
      <View style={styles.thickDivider} />
      {/* My Activities */}
      <ScrollView style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>나의 활동</Text>
        <CategoryItem label="봉사 활동" route="MyVolunteer" />
        <CategoryItem label="미션 참여" route="MyMission" />
        <CategoryItem label="나의동네 게시판" route="MyLocalBoard" />
        <CategoryItem label="나의나눔 게시판" route="MyShareBoard" />
        <View style={styles.divder}/>

        <Text style={styles.sectionTitle}>고객센터</Text>
        <CategoryItem label="FAQ" route="FAQ" />
        <CategoryItem label="공지사항" route="Notice" />
        <CategoryItem label="1:1 문의" route="Inquiry" />
        <View style={styles.divder}/>

        <Text style={styles.sectionTitle}>앱 설정</Text>
        <CategoryItem label="알림 설정" route="Notification"/>
        <CategoryItem label="언어 설정" route="Language"/>
        <CategoryItem label="텍스트 크기" route="FontSize"/>
        <View style={styles.thickDivider}/>

        <View style={styles.logout}>
        <Image source={require('../../assets/icons/logout.png')} style={styles.logoutIcon} />
        <Text style={styles.logoutText} onPress={handleLogout}>로그아웃</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default MyPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileImg: {
    width: 47,
    height: 47,
    borderRadius: 23.5,
    marginLeft: 'auto'
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: 20
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  nickname: {
    fontSize: 18,
    marginLeft: 20
  },
  settingIcon: {
    width: 24,
    height: 24,
    marginLeft: 'auto'
  },
  pointLevel:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 30,
    padding: 10,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: 8,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  levelBox:{
    marginHorizontal: 20,
    padding : 15,
    gap: 10,
    alignItems: 'center',
  },
  pointBox: {
    alignItems: 'center',
    marginHorizontal: 20,
    padding: 15,
    gap: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  level: {
    fontSize: 18,
    color: '#229658'
  },
  points: {
    fontSize: 18,
  },
  sectionWrapper: {
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: 800,
    marginTop: 20,
    marginLeft: 15,
    paddingHorizontal: 20
  },
  menuItem: {
    marginLeft: 30,
    fontSize: 18,
    marginTop: 15,
    paddingHorizontal: 20
  },
  thickDivider: {
    height: 5,
    marginTop: 30,
    backgroundColor: '#F0F0F0',
  },
  divder:{
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: 30,
    marginVertical: 20,
  },
  logout:{
    flexDirection: 'row',
    marginVertical: 30,
    marginHorizontal: 40,
    gap: 10,
    alignItems: 'center',
  },
  logoutIcon:{
    width: 23,
    height: 23,
  },
  logoutText:{
    fontSize: 17,
  },
});
