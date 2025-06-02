import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import AppText from '../../components/common/AppText';

const categories = ['회원정보', '포인트', '봉사/클래스', '나눔 마켓', '기타'];

const FaqScreen = () => {
  const [activeCategory, setActiveCategory] = useState('회원정보');

  const faqs = [
    '[회원정보] 회원 탈퇴는 어떻게 하나요?',
    '[회원정보] SNS 로그인 연동을 추가하고 싶어요.',
  ];

  return (
    <View style={styles.container}>
      {/* 검색창 */}
      <View style={styles.searchBox}>
        <TextInput placeholder="검색어를 입력하세요" style={styles.searchInput} />
        <Image source={require('../../assets/icons/search.png')} style={styles.searchIcon} />
      </View>

      {/* 카테고리 */}
      <View style={styles.categoryWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryRow}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              onPress={() => setActiveCategory(category)}
              style={[
                styles.categoryBtn,
                activeCategory === category
                  ? styles.categoryActive
                  : styles.categoryInactive,
              ]}
            >
              <AppText
                style={[
                  styles.categoryText,
                  activeCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </AppText>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* FAQ 내용 */}
      <ScrollView>
        <View style={styles.sectionHeader}>
          <AppText style={styles.sectionTitle}>{activeCategory}</AppText>
        </View>

        {faqs.map((item, idx) => (
          <View key={idx} style={styles.faqItem}>
            <AppText style={styles.faqText}>{item}</AppText>
          </View>
        ))}
      </ScrollView>

      {/* 플로팅 버튼 */}
      <TouchableOpacity style={styles.floatingButton}>
        <Image source={require('../../assets/icons/write.png')} style={styles.writeIcon} />
      </TouchableOpacity>
    </View>
  );
};

export default FaqScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  searchBox: {
    marginTop: 15,
    marginHorizontal: 20,
    height: 50,
    borderRadius: 50,
    borderColor: '#000',
    borderWidth: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
  },
  searchIcon: {
    width: 28,
    height: 28,
  },
  categoryWrapper: {
    height: 40,
    marginTop: 20,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  categoryBtn: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 7,
    marginRight: 10,
    justifyContent: 'center',
  },
  categoryActive: {
    backgroundColor: '#000',
  },
  categoryInactive: {
    borderWidth: 1,
    borderColor: '#bdbdbd',
  },
  categoryText: {
    fontSize: 13,
    lineHeight: 16,
    textAlignVertical: 'center',
    includeFontPadding: false,
    paddingVertical: 0,
    marginVertical: 0,
  },
  categoryTextActive: {
    color: '#fff',
  },
  sectionHeader: {
    backgroundColor: '#F7F7F7',
    margin:15,
    borderTopWidth: 3,
    borderTopColor: '#c3c2c2',
    paddingVertical: 12,
    alignItems: 'center',
  },
  sectionTitle: {
    fontWeight: '600',
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#c3c2c2',
    marginHorizontal: 17,
    paddingVertical: 18,
  },
  faqText: {
    fontWeight: '400',
    color: '#000',
  },
  floatingButton: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: 'rgba(147, 235, 24, 0.51)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  writeIcon: {
    width: 24,
    height: 24,
  },
});
