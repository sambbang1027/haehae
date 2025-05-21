import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';

const LANGUAGES = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'ENGLISH' },
  { code: 'ja', label: '日本語' },
  { code: 'zh', label: '中文' },
];

const LanguageSettings = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('ko');

  const handleLanguageChange = (code: string) => {
    setSelectedLanguage(code);
    // 필요하다면 여기서 i18n 변경 or API 호출
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>

      {/* 언어 선택 박스 */}
      <View style={styles.languageBox}>
        {LANGUAGES.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={styles.languageItem}
            onPress={() => handleLanguageChange(lang.code)}
          >
            <Text style={styles.languageText}>{lang.label}</Text>
            {selectedLanguage === lang.code && (
              <Image source={require('../../assets/icons/check.png')} style={styles.checkIcon} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default LanguageSettings;
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    paddingTop: 20,
  },
  languageBox: {
    marginTop: 30,
    marginHorizontal: 25,
    backgroundColor: '#f7f7f7',
    borderRadius: 7,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  languageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  languageText: {
    fontSize: 17,
    fontWeight: '700',
    color: '#000',
  },
  checkIcon: {
    width: 25,
    height: 25,
  },
});
