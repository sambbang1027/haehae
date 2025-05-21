import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { ImageSourcePropType } from 'react-native';

type Props = {
  img?: ImageSourcePropType;
  content?: string | React.ReactNode; // 단순 텍스트 | 복합 구조
  onConfirm: () => void;
};

const AlertModal = ({ img, content, onConfirm }: Props) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img}
        source={img?? require('../../assets/icons/alert.png')}
      />

      {typeof content === 'string' ? (
        <Text style={styles.message}>{content}</Text>
      ) : (
        content
      )}

      <TouchableOpacity onPress={onConfirm} style={styles.confirmBtn}>
        <Text style={styles.confirmText}>확인</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AlertModal;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    width: '100%',
    alignItems: 'center',
  },
  img:{
    width: 50,
    height: 50,
    objectFit: 'contain',
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
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
});
