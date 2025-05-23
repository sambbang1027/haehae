// components/CustomSearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

interface Props {
  value: string;
  onChange: (text: string) => void;
  onSubmit?: () => void; // 선택: 돋보기 버튼 클릭 시 처리
}

export default function CustomSearchBar({ value, onChange, onSubmit }: Props) {
  return (
    <View style={styles.searchContainer}>
      <TextInput
        placeholder="검색어를 입력하세요."
        value={value}
        onChangeText={onChange}
        onSubmitEditing={onSubmit}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TouchableOpacity onPress={onSubmit}>
        <Icon name="search" size={20} color="#000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    width: 385,
    height: 60,
    marginLeft: -1,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
});
