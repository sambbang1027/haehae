import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useTextSize } from '../../context/TextSizeContext';

const TextSizeSetting = () => {
  const { size: selectedSize, setSize } = useTextSize();

  return (
    <View style={styles.container}>
      {/* Preview Box */}
      <View style={styles.previewBox}>
        <Text style={[styles.previewText, fontSizeMap[selectedSize]]}>
          이 문장의 글자 크기로 조절됩니다.
        </Text>
      </View>

      {/* 선택 박스 */}
      <View style={styles.optionBox}>
        {textOptions.map((opt) => (
          <TouchableOpacity key={opt.key} onPress={() => setSize(opt.key)}>
            <View style={styles.optionRow}>
              <Text style={styles.optionText}>{opt.label}</Text>
              {selectedSize === opt.key && (
                <Image
                  source={require('../../assets/icons/check.png')}
                  style={styles.checkIcon}
                />
              )}
            </View>
            {opt.key !== 'large' && <View style={styles.divider} />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default TextSizeSetting;

const textOptions = [
  { key: 'small', label: '작게' },
  { key: 'medium', label: '보통' },
  { key: 'large', label: '크게' },
] as const;

const fontSizeMap = {
  small: { fontSize: 15 },
  medium: { fontSize: 18 },
  large: { fontSize: 22 },
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  previewBox: {
    backgroundColor: '#f7f7f7',
    margin: 25,
    height: 158,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  previewText: {
    fontWeight: '700',
  },
  optionBox: {
    marginHorizontal: 26,
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#f7f7f7',
    elevation: 2,
    paddingVertical: 20,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 35,
    paddingVertical: 10,
    alignItems: 'center',
  },
  optionText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  checkIcon: {
    width: 24,
    height: 24,
  },
  divider: {
    height: 1,
    backgroundColor: '#d0cbcb',
    marginHorizontal: 32,
  },
});
