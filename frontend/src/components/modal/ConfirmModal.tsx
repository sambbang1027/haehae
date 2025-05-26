import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import AppText from '../common/AppText';
import { ImageSourcePropType } from 'react-native';
type Props = {
  img?: ImageSourcePropType;
  content?: string | React.ReactNode; // 단순 텍스트 | 복합 구조
  onConfirm: () => void;
  onCancel: () => void;
};

const ConfirmModal = ({ img, content, onConfirm, onCancel }: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} 
      source={img?? require('../../assets/icons/confirm.png')} />

      {typeof content === 'string' ? (
        <AppText style={styles.message}>{content}</AppText>
      ) : (
        content
      )}

      <View style={styles.btnBox}>
        <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
            <Text style={styles.confirmText}>확인</Text>
        </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={styles.confirmBtn}>
            <Text style={styles.confirmText}>취소</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  img: {
    width : 50,
    height: 50,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  message: {
    fontSize: 17,
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  confirmBtn: {
    backgroundColor: 'rgba(147, 235, 24, 0.51)',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  confirmText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  btnBox:{
    flexDirection : 'row',
    gap: 10,
  }
});
