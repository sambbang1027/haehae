import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Navigation = NativeStackNavigationProp<AppStackParamList>;

export default function Footer() {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.footer}>
      <View style={styles.topLine} />
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('category')}>
          <Image source={require('../../assets/icons/menuEntry.png')} style={styles.icon} />
          <Text style={styles.label}>카테고리</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('CommunityStack', { screen: 'Community' })}>
          <Image source={require('../../assets/icons/communityEntry.png')} style={styles.icon} />
          <Text style={styles.label}>커뮤니티</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.centerItem} onPress={() => navigation.navigate('MainStack', { screen: 'Main' })}>
          <Image source={require('../../assets/icons/footerLogo.png')} style={styles.centerLogo} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Image source={require('../../assets/icons/recycleEntryLogo.png')} style={styles.icon} />
          <Text style={styles.label}>분리수거</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('MyPageStack', { screen: 'MyPage' })}>
          <Image source={require('../../assets/icons/profileLogo.png')} style={styles.icon} />
          <Text style={styles.label}>마이</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    backgroundColor: '#fff',
    height: hp('11%'), // 반응형 높이
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#bcbcbc',
  },
  topLine: {
    height: 1,
    backgroundColor: '#bcbcbc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: wp('2%'),
  },
  item: {
    alignItems: 'center',
  },
  icon: {
    width: wp('8%'),
    height: wp('8%'),
    marginBottom: hp('0.5%'),
  },
  label: {
    fontSize: wp('3%'),
  },
  centerItem: {
    alignItems: 'center',
    marginTop: -hp('7%'), // 로고 위로 이동
  },
  centerLogo: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: wp('9%'),
  },
});
