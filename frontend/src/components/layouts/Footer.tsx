import React from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigation/AppNavigator';

type Navigation = NativeStackNavigationProp<AppStackParamList>;


export default function Footer() {
  const navigation = useNavigation<Navigation>();

  return (
    <View style={styles.footer}>
      <View style={styles.topLine} />
      <View style={styles.row}>
        <TouchableOpacity style={styles.item} onPress={()=> navigation.navigate('category')}>
          <Image source={require('../../assets/icons/menuEntry.png')} style={styles.icon} />
          <Text style={styles.label}>카테고리</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image source={require('../../assets/icons/communityEntry.png')} style={styles.icon} />
          <Text style={styles.label}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.centerItem}>
          <Image source={require('../../assets/icons/footerLogo.png')} style={styles.centerLogo} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item}>
          <Image source={require('../../assets/icons/recycleEntryLogo.png')} style={styles.icon} />
          <Text style={styles.label}>분리수거</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} 
        onPress={() => navigation.navigate('MyPageStack', {screen:'MyPage'})}>
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
    height: 105,
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
    paddingHorizontal: 10,
  },
  item: {
    alignItems: 'center',
  },
  icon: {
    width: 35,
    height: 35,
    marginBottom: 4,
  },
  label: {
    fontSize: 13,
  },
  centerItem: {
    alignItems: 'center',
    marginTop: -50, // 로고가 살짝 위로 올라오게
  },
  centerLogo: {
    width: 83,
    height: 83,
    borderRadius: 42,
  },
});
