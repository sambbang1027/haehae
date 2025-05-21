import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.header}>
      <Image source={require('../../assets/appLogo.png')} style={styles.logo} />
      <Image source={require('../../assets/appTitle.png')} style={styles.title} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    marginBottom: 10,
    justifyContent: 'flex-start',
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    marginRight: -4,
    marginLeft: -20,
  },
  title: {
    width: 120,
    height: 80,
    resizeMode: 'contain',
    marginLeft: -8
  },
});
