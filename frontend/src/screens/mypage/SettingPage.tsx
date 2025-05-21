import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MyPageStackParamList } from '../../navigation/MyPageNavigator'; 
import { LoginStackParamList } from '../../navigation/LoginNavigator';


type SettingItemProps = {
  label: string;
  route:
    | keyof MyPageStackParamList
    | {
        stack: 'LoginStack';
        screen: keyof LoginStackParamList;
        params?: LoginStackParamList[keyof LoginStackParamList];
      };
  style?: object;
};

const SettingItem = ({ label, route, style }: SettingItemProps) => {
  const navigation = useNavigation<any>();

  const handlePress = () => {
    if (typeof route === 'string') {
      navigation.navigate(route); // 같은 스택 내 단일 스크린 이동
    } else {
      navigation.navigate(route.stack, {
        screen: route.screen,
        params: route.params,
      });
    }
  };


  return (
    <TouchableOpacity onPress={handlePress}>
      <Text style={[styles.itemText, style]}>{label}</Text>
    </TouchableOpacity>
  );
};

const SettingPage = () => {
  const userName = '김정우';
  const residenceType = '아파트';

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.userSection}>
          <Text style={styles.userName}>{userName}님</Text>
          <Text style={styles.residence}>{residenceType}</Text>
        </View>

        <SettingItem label="회원정보 수정" route="CheckPw" />
        <SettingItem label="프로필 수정" route="EditProfile" />
        <SettingItem label="비밀번호 변경" route={{ stack: 'LoginStack', screen: 'SetPw' }} />

        <View style={styles.grayDivider} />

        <SettingItem label="회원탈퇴" route="Withdraw" style={styles.withdrawText} />
      </ScrollView>
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  contentWrapper: {
    paddingTop: 24
  },
  userSection:{
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  userName: {
    fontSize: 23,
    fontWeight: '600',
    color: '#000'
  },
  residence: {
    fontSize: 17,
    color: '#9c9c9c',
    marginTop: 10
  },
  grayDivider: {
    height: 8,
    backgroundColor: '#f0f0f0',
    marginVertical: 30
  },
  itemText: {
    fontSize: 18,
    marginLeft: 30,
    marginBottom: 25,
    paddingHorizontal: 24,
  },
  withdrawText: {
    color: '#9c9c9c',
    textDecorationLine: 'underline'
  },
});
