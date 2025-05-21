import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

const BottomSheetModal = ({ children }: { children: ReactNode }) => {
  return (
    <View style={styles.overlay}>
      <View style={styles.sheet}>
        {children}
      </View>
    </View>
  );
};

export default BottomSheetModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
});
