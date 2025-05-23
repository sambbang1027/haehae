import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyPage from '../screens/mypage/MyPage';
import SettingPage from '../screens/mypage/SettingPage';
import CheckPw from '../screens/mypage/CheckPwPage';
import EditUserInfo from '../screens/mypage/EditUserInfoPage';
import EditProfile from '../screens/mypage/EditProfilePage';
import LevelInfo from '../screens/mypage/LevelInfoPage';
import PointRecord from '../screens/mypage/PointRecordPage';
import MyVolunteer from '../screens/mypage/MyVolunteerPage';
import MyMission from '../screens/mypage/MyMissonPage';
import MyLocalBoard from '../screens/mypage/MyLocalBoardPage';
import MySharing from '../screens/mypage/MySharingPage';
import FontSize from '../screens/mypage/FontSizeSettingPage';
import NotificationSettings from '../screens/mypage/NotificationSettingPage';
import Faq from '../screens/mypage/FaqPage';
import Notice from '../screens/mypage/NoticePage';
import Inquiry from '../screens/mypage/InquiryPage';

// 네비게이션 스택 타입 정의
export type MyPageStackParamList = {
  MyPage: undefined;
  SettingPage: undefined;
  CheckPw: undefined;
  EditUserInfo: undefined;
  EditProfile: undefined;
  LevelInfo: undefined;
  PointRecord: undefined;
  MyVolunteer: undefined;
  MyMission: undefined;
  MyLocalBoard: undefined;
  MySharing: undefined;
  FontSize: undefined;
  NotificationSettings: undefined;
  Faq: undefined;
  Notice: undefined;
  Inquiry: undefined;
};

const Stack = createNativeStackNavigator<MyPageStackParamList>();

const MyPageNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="MyPage"
      screenOptions={{
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingPage"
        component={SettingPage}
        options={{ title: '설정' }}
      />
      <Stack.Screen
        name="CheckPw"
        component={CheckPw}
        options={{ title: '회원정보 수정' }}
      />
      <Stack.Screen
        name="EditUserInfo"
        component={EditUserInfo}
        options={{ title: '회원정보 수정' }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ title: '프로필 수정' }}
      />
      <Stack.Screen
        name="LevelInfo"
        component={LevelInfo}
        options={{ title: '등급' }}
      />
      <Stack.Screen 
        name='PointRecord'
        component={PointRecord}
        options={{title: '포인트 내역'}}
      />
      <Stack.Screen
        name='MyVolunteer'
        component={MyVolunteer}
        options={{title: '봉사활동'}}
      />
       <Stack.Screen
        name='MyMission'
        component={MyMission}
        options={{title: '미션 참여'}}
      />
      <Stack.Screen 
        name='MyLocalBoard'
        component={MyLocalBoard}
        options={{title: '나의 동네 게시판'}}
      />
      <Stack.Screen 
        name='MySharing'
        component={MySharing}
        options={{title: '나의 나눔 게시판'}}
      />
      <Stack.Screen 
        name='FontSize'
        component={FontSize}
        options={{title: '텍스트 크기'}}
      />
      <Stack.Screen 
        name='NotificationSettings'
        component={NotificationSettings}
        options={{title: '알림 설정'}}
      />
      <Stack.Screen 
        name='Faq'
        component={Faq}
        options={{title: 'FAQ'}}
      />
      <Stack.Screen 
        name='Notice'
        component={Notice}
        options={{title:'공지사항'}}
      />
      <Stack.Screen 
        name='Inquiry'
        component={Inquiry}
        options={{title:'1 : 1 문의'}}
      />
    </Stack.Navigator>
  );
};

export default MyPageNavigator;
