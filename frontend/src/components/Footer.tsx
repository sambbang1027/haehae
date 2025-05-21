import React from 'react';
import { View, Text, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import { AppStackParamList } from '../navigation/AppNavigator';

export default function Footer() {

  const navigation = useNavigation<NavigationProp<AppStackParamList>>();

  return (
    <View style={styles.footer}>
      <View style={styles.topLine} />
      <View style={styles.row}>

        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('TestStack')}
        >
          <Image source={require('../assets/menuEntry.png')} style={styles.icon} />
          <Text style={styles.label}>카테고리</Text>
        </TouchableOpacity>

        
        <View style={styles.item}>
          <Image source={require('../assets/communityEntry.png')} style={styles.icon} />
          <Text style={styles.label}>커뮤니티</Text>
        </View>
        <View style={styles.centerItem}>
          <Image source={require('../assets/footerLogo.png')} style={styles.centerLogo} />
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/recycleEntryLogo.png')} style={styles.icon} />
          <Text style={styles.label}>분리수거</Text>
        </View>
        <View style={styles.item}>
          <Image source={require('../assets/profileLogo.png')} style={styles.icon} />
          <Text style={styles.label}>마이</Text>
        </View>
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
    marginTop: -20, // 로고가 살짝 위로 올라오게
  },
  centerLogo: {
    width: 83,
    height: 83,
    borderRadius: 42,
  },
});
