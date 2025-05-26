import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

const DefaultModal = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

export default DefaultModal;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    alignSelf: 'center',
  },
});
