import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import AppText from '../../components/common/AppText';
import { useModal } from '../../context/ModalContext';
import { AppStackParamList } from '../../navigation/AppNavigator';
import SettingPage from './SettingPage';
import { useUser } from '../../context/UserContext.tsx';


type Navigation = NativeStackNavigationProp<AppStackParamList>;

type CategoryItemProps = {
  label: string;
  to: {
    stack: keyof AppStackParamList;
    screen: string;
  };
};

const CategoryItem: React.FC<CategoryItemProps> = ({ label, to }) => {
  const navigation = useNavigation<Navigation>();

  const handlePress = () => {
    navigation.navigate(to.stack, { screen: to.screen } as any);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.menuItem}>{label}</Text>
    </TouchableOpacity>
  );
};
          <CategoryItem label="분리수거 캘린더" to={{ stack: 'RecycleCalendarStack', screen: 'RecycleCalendarScreen' }} />

const MyPage = () => {
  const navigation = useNavigation<Navigation>();
  const {showModal, hideModal} = useModal();
  const {logout, user} = useUser();
  console.log('로그인 후 유저 정보 ',user?.nickname);
  const handleLogout = () => {
  showModal({
    type: 'confirm',
    content: '로그아웃 하시겠습니까?',
    async onConfirm() {
      await logout();  // 사용자 상태 초기화 및 토큰 삭제
      navigation.navigate('LoginStack', { screen: 'Login' });
    },
  });
};

  const goToSettings = () => {
     navigation.navigate('MyPageStack', { screen: 'SettingPage' });
  };
  const goToLevelInfo = () => {
    navigation.navigate('MyPageStack', {screen: 'LevelInfo'});
  };
  const goToPointRecord = () => {
    navigation.navigate('MyPageStack',{screen:'PointRecord'});
  }

  return (
    <View style={styles.container}>

      {/* User Info */}
      <View style={styles.userSection}>
        <Image source={require('../../assets/icons/profile.png')} style={styles.avatar} />
        <AppText style={styles.nickname}>닉네임</AppText>
        <TouchableOpacity style={styles.settingIcon} onPress={goToSettings}>
          <Image source={require('../../assets/icons/setting.png')} style={styles.settingIcon} />
        </TouchableOpacity>
      </View>

      {/* Point and Level */}
      <View style={styles.pointLevel}>
        
          <TouchableOpacity style={styles.levelBox} onPress={goToLevelInfo}>
            <Image source={require('../../assets/icons/sprout_level.png')} style={styles.icon} />
            <AppText style={styles.level}>새싹 등급</AppText>
          </TouchableOpacity>

        <TouchableOpacity style={styles.pointBox} onPress={goToPointRecord}>
          <Image source={require('../../assets/icons/point-icon.png')} style={styles.icon} />
          <AppText>1,030P</AppText>
        </TouchableOpacity>
   
      </View>
      <View style={styles.thickDivider} />
      {/* My Activities */}
      <ScrollView style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>나의 활동</Text>
        
        <CategoryItem label="봉사 활동"  to={{ stack: 'MyPageStack', screen: 'MyVolunteer' }} />
        <CategoryItem label="미션 참여"  to={{ stack: 'MyPageStack', screen: 'MyMission' }}/>
        <CategoryItem label="나의동네 게시판" to={{ stack: 'MyPageStack', screen: 'MyLocalBoard' }}/>
        <CategoryItem label="나의나눔 게시판" to={{ stack: 'MyPageStack', screen: 'MySharing' }}/>
        <View style={styles.divder}/>

        <Text style={styles.sectionTitle}>고객센터</Text>
        <CategoryItem label="FAQ"to={{ stack: 'MyPageStack', screen: 'Faq' }} />
        <CategoryItem label="공지사항" to={{ stack: 'MyPageStack', screen: 'Notice' }} />
        <CategoryItem label="1:1 문의" to={{ stack: 'MyPageStack', screen: 'Inquiry' }} />
        <View style={styles.divder}/>

        <Text style={styles.sectionTitle}>앱 설정</Text>
        <CategoryItem label="알림 설정" to={{ stack: 'MyPageStack', screen: 'NotificationSettings' }} />
        <CategoryItem label="텍스트 크기" to={{ stack: 'MyPageStack', screen: 'FontSize' }} />
        <View style={styles.thickDivider}/>

        <View style={styles.logout}>
        <Image source={require('../../assets/icons/logout.png')} style={styles.logoutIcon} />
        <AppText onPress={handleLogout}>로그아웃</AppText>
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
    color: '#229658'
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
});
