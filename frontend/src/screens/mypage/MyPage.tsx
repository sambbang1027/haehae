import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import AppText from '../../components/common/AppText';
import { useModal } from '../../context/ModalContext';
import { useUser } from '../../context/UserContext';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { navigate } from '../../navigation/NavigationService.ts';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import api from '../../api/AxiosInstance.ts';
import { color } from 'react-native-elements/dist/helpers/index';


type CategoryItemProps<
  T extends keyof AppStackParamList,
  S extends AppStackParamList[T] extends NavigatorScreenParams<infer P> ? keyof P : never
> = {
  label: string;
  stack: T;
  screen: S;
};

const CategoryItem = <
  T extends keyof AppStackParamList,
  S extends AppStackParamList[T] extends NavigatorScreenParams<infer P> ? keyof P : never
>({
  label,
  stack,
  screen,
}: CategoryItemProps<T, S>) => {
  const handlePress = () => {
    navigate(stack, { screen } as any); // any로 안전하게 
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={styles.menuItem}>{label}</Text>
    </TouchableOpacity>
  );
};


const MyPage = () => {
  const { showModal } = useModal();
  const { logout, user } = useUser();
  const [userLevel, setUserLevel] = useState<string | null>(null);
  const [levelImg , setLevelImg] = useState<any>(null);
  const [levelStyle, setLevelStyle] = useState<any>(null);
  const [userPoint , setUserPoint ] = useState( ); 

  useEffect(()=>{
    getInfo();
  },[]);

 const getInfo = async() => {
  try{
    const response = await api.get('/user/get/mypage/info');
    if(response.data.code === 'SUCCESS'){
      const level = response.data.data.levelName;
      setUserLevel(level);

      switch(level){
        case '씨앗':
          setLevelImg(require('../../assets/icons/seed_level.png'));
          setLevelStyle({color : '#774B1C',fontWeight:600});
        break;
        case '새싹':
          setLevelImg(require('../../assets/icons/sprout_level.png'));
          setLevelStyle({color : '#229658', fontWeight : 600});
        break;
        case '꽃':
          setLevelImg(require('../../assets/icons/flower_level.png'));
          setLevelStyle({color : '#D9A200', fontWeight : 600});
        break;
        case '나무':
          setLevelImg(require('../../assets/icons/tree_level.png'));
          setLevelStyle({color: '#1F68B1', fontWeight : 600});s
        break;
      }

      setUserPoint(response.data.data.currentPoint==null ? 0 : response.data.data.currentPoint);
    }
  }catch(error){
    console.error('유저 정보 조 회 싫패 : ', error);
  }
 } 

  const handleLogout = () => {
    showModal({
      type: 'confirm',
      content: '로그아웃 하시겠습니까?',
      async onConfirm() {
        await logout();
        navigate('LoginStack',{screen: 'Login'});
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.userSection}>
        <Image source={require('../../assets/icons/profile.png')} style={styles.avatar} />
        <AppText style={styles.nickname}>{user?.nickname}</AppText>
        <TouchableOpacity style={styles.settingIcon} onPress={() => navigate('MyPageStack',{screen: 'SettingPage'})}>
          <Image source={require('../../assets/icons/setting.png')} style={styles.settingIcon} />
        </TouchableOpacity>
      </View>

      <View style={styles.pointLevel}>
        <TouchableOpacity style={styles.levelBox} onPress={() => navigate('MyPageStack',{screen: 'LevelInfo'})}>
          {levelImg ? (
            <Image source={levelImg} style={styles.icon} />
          ) : (
            <Image source={require('../../assets/icons/seed_level.png')} style={styles.icon} />
          )}
          <Text style={levelStyle}>{userLevel}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.pointBox} onPress={() => navigate('MyPageStack',{screen: 'PointRecord'})}>
          <Image source={require('../../assets/icons/point-icon.png')} style={styles.icon} />
          <AppText>{userPoint}P</AppText>
        </TouchableOpacity>
      </View>

      <View style={styles.thickDivider} />

      <ScrollView style={styles.sectionWrapper}>
        <Text style={styles.sectionTitle}>나의 활동</Text>
        <CategoryItem label="봉사 활동"  stack="MyPageStack" screen="MyVolunteer" />
        <CategoryItem label="미션 참여"  stack="MyPageStack" screen="MyMission" />
        <CategoryItem label="나의동네 게시판"  stack="MyPageStack" screen="MyLocalBoard" />
        <CategoryItem label="나의나눔 게시판"  stack="MyPageStack" screen="MySharing" />

        <View style={styles.divder} />

        <Text style={styles.sectionTitle}>고객센터</Text>
        <CategoryItem label="FAQ"  stack="MyPageStack" screen="Faq" />
        <CategoryItem label="공지사항"  stack="MyPageStack" screen="Notice" />
        <CategoryItem label="1:1 문의"  stack="MyPageStack" screen="Inquiry" />

        <View style={styles.divder} />

        <Text style={styles.sectionTitle}>앱 설정</Text>
        <CategoryItem label="알림 설정" stack="MyPageStack" screen="NotificationSettings" />
        <CategoryItem label="텍스트 크기"  stack="MyPageStack" screen="FontSize" />

        <View style={styles.thickDivider} />

        <View style={styles.logout}>
          <Image source={require('../../assets/icons/logout.png')} style={styles.logoutIcon} />
          <AppText onPress={handleLogout}>로그아웃</AppText>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  profileImg: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    marginLeft: 'auto'
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
    marginTop: hp('2.5%')
  },
  avatar: {
    width: wp('13%'),
    height: wp('13%'),
    borderRadius: wp('6.5%')
  },
  nickname: {
    marginLeft: wp('4%'),
    fontSize: wp('4.5%')
  },
  settingIcon: {
    width: wp('6%'),
    height: wp('6%'),
    marginLeft: 'auto'
  },
  pointLevel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: wp('8%'),
    padding: hp('1.5%'),
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#c7c7c7',
    borderRadius: wp('2%'),
    marginTop: hp('2.5%'),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2
  },
  levelBox: {
    marginHorizontal: wp('5%'),
    padding: hp('2%'),
    gap: hp('1.5%'),
    alignItems: 'center'
  },
  pointBox: {
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    padding: hp('2%'),
    gap: hp('1.5%')
  },
  icon: {
    width: wp('7.5%'),
    height: wp('7.5%')
  },
  sectionWrapper: {
    marginVertical: hp('1.5%')
  },
  sectionTitle: {
    fontSize: wp('4%'),
    fontWeight: '800',
    marginTop: hp('2%'),
    marginLeft: wp('4%'),
    paddingHorizontal: wp('5%')
  },
  menuItem: {
    marginLeft: wp('7%'),
    marginTop: hp('1.8%'),
    fontSize: wp('4%'),
    paddingHorizontal: wp('5%')
  },
  thickDivider: {
    height: hp('0.7%'),
    marginTop: hp('3%'),
    backgroundColor: '#F0F0F0'
  },
  divder: {
    height: 1,
    backgroundColor: '#ccc',
    marginHorizontal: wp('8%'),
    marginVertical: hp('2.5%')
  },
  logout: {
    flexDirection: 'row',
    marginVertical: hp('4%'),
    marginHorizontal: wp('10%'),
    gap: wp('3%'),
    alignItems: 'center'
  },
  logoutIcon: {
    width: wp('6%'),
    height: wp('6%')
  }
});

export default MyPage;