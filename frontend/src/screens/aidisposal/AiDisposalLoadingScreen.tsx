import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const AiDisposalLoadingScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>배출 제한 가이드</Text>
        <Text style={styles.close}>✕</Text>
      </View>

      {/* 본문 */}
      <View style={styles.content}>
        <Text style={styles.mainText}>분리배출 방법 분석 중...</Text>

        <Text style={{ fontSize: 50, textAlign: 'center', paddingTop: hp('5%') }}>⏳</Text>

        <Text style={styles.subText}>잠시만 기다려 주세요!</Text>
      </View>

      <TouchableOpacity
        style={[styles.button, { marginTop: hp('4%'), backgroundColor: '#86EFAC' }]}
        onPress={() => navigation.navigate('AiDisposalResult')}
      >
        <Text style={styles.buttonText}>다음</Text>  
      </TouchableOpacity>  

      
    </View>
  );
};

export default AiDisposalLoadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: hp('8%'),
    borderBottomWidth: 1,
    borderBottomColor: '#d4d4d4',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    color: '#000',
  },
  close: {
    position: 'absolute',
    right: wp('5%'),
    top: '50%',
    transform: [{ translateY: -wp('3%') }],
    fontSize: wp('5.5%'),
    color: '#000',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: wp('8%'),
    paddingTop: hp('10%'),
  },
  mainText: {
    fontSize: wp('6%'),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: hp('6%'),
  },
  image: {
    width: wp('20%'),
    height: wp('24%'),
    marginBottom: hp('6%'),
  },
  subText: {
    fontSize: wp('4.3%'),
    fontWeight: '600',
    color: '#000',
    marginTop: hp('2.5%'),
  },
  button: {
    backgroundColor: '#D9F99D',
    borderRadius: 6,
    width: '100%',
    paddingVertical: hp('2.3%'),
    alignItems: 'center',
    marginBottom: hp('2.5%'),
  },
  buttonText: {
    fontSize: wp('4.3%'),
    fontWeight: 'bold',
    color: '#000',
  },
});