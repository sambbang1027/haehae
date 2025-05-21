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

const categories = ['일반공지', '이벤트 안내', '약관/정책공지'];

const NoticeScreen = () => {
  const [activeCategory, setActiveCategory] = useState('일반공지');

  const notices = [
    '[일반] 커뮤니티 정책',
    '[일반] 상품 허위 정보 신고 센터',
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

        {notices.map((item, idx) => (
          <View key={idx} style={styles.noticeItem}>
            <AppText style={styles.noticeText}>{item}</AppText>
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

export default NoticeScreen;
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
  noticeItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#c3c2c2',
    marginHorizontal: 17,
    paddingVertical: 18,
  },
  noticeText: {
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
