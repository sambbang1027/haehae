import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AiDisposalParamList } from '../../navigation/AiDisposalNavigator';


const AiDisposalEntryScreen = () => {

  const navigation = useNavigation<NativeStackNavigationProp<AiDisposalParamList>>();

  return (
    <View style={styles.container}>
      {/* 상단 헤더 */}
      {/* <View style={styles.header}>
        <Text style={styles.headerTitle}>분리배출 가이드</Text>
        <Text style={styles.close}>✕</Text>
      </View> */}

      {/* 본문 영역 */}
      <View style={styles.content}>
        <Text style={styles.mainTitle}>분리배출 방법을 알려드릴게요!</Text>
        <Text style={styles.description}>
          촬영하거나 사진을 업로드해서 폐기 방법을 확인하세요.
        </Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>📷 사진 촬영하기</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>🖼️ 갤러리에서 사진 선택하기</Text>
        </TouchableOpacity>

        <Text style={styles.notice}>
          * 플라스틱, 종이, 캔 등 다양한 품목을 인식할 수 있습니다.
        </Text>

        {/* ✅ 다음 버튼 */}
        <TouchableOpacity
          style={[styles.button, { marginTop: hp('4%'), backgroundColor: '#86EFAC' }]}
          onPress={() => navigation.navigate('AiDisposalLoadingScreen')}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>        

      </View>
    </View>
  );
};

export default AiDisposalEntryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: hp('8%'),
    width: '100%',
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
    paddingTop: hp('7%'),
    paddingHorizontal: wp('6%'),
    paddingBottom: hp('10%'),
  },
  mainTitle: {
    fontSize: wp('5.5%'),
    fontWeight: 'bold',
    color: '#000',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  description: {
    fontSize: wp('4%'),
    color: '#000',
    textAlign: 'center',
    marginBottom: hp('5%'),
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
  notice: {
    fontSize: wp('3.2%'),
    color: '#666',
    textAlign: 'center',
    marginTop: hp('2%'),
  },
});
