import React, { ReactNode } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const DefaultModal = ({ children }: { children: ReactNode }) => {
  return( 
  <View style={styles.container}>
    {children}
      {/* <ScrollView 
        showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      {children}
      </ScrollView> */}
    </View>
)};

export default DefaultModal;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: wp('80%'),
    alignSelf: 'center',
  },

  content: {
    flexGrow: 1,
  },
});
