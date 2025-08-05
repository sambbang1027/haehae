import React from 'react';
import Postcode from '@actbase/react-daum-postcode';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type Props = {
  onSelect: (address: string, bcode: string) => void;
  onClose: () => void;
};

const AddressSearchModal = ({ onSelect, onClose }: Props) => {
  return (
    <>
    <View style={styles.closeButtonWrapper}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.closeText}>✕</Text>
      </TouchableOpacity>
    </View>
    <Postcode
        style={styles.container}
        jsOptions={{ animation: true }}
        onSelected={(data: any) => {
          onSelect(data.address, data.bcode);
          onClose();
        } }
        onError={() => {
          onClose();
        } } />
        </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('100%'),
  },
  closeButtonWrapper: {
    alignItems: 'flex-end',
    paddingHorizontal: wp('3%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('1.5%'),
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    zIndex: 10,
  },
  closeText: {
    fontSize: wp('4.2%'),
    fontWeight: '600',
    color: '#333',
  },
});

export default AddressSearchModal;
