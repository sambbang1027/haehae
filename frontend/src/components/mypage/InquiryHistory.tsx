import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import AppText from '../common/AppText';

const inquiryData = [
  {
    id: '1',
    category: '회원 관리',
    question: '이메일 주소 변경은 안되나요?',
    date: '2025.01.07',
    status: '대기',
    answer: '',
  },
  {
    id: '2',
    category: '회원 관리',
    question: '회원 탈퇴는 어떻게 하나요?',
    date: '2025.01.01',
    status: '완료',
    answer:
      '회원 탈퇴는 설정 버튼을 클릭하면 회원 탈퇴를 진행할 수 있습니다.',
  },
];

const InquiryHistory = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const renderItem = ({ item }: { item: typeof inquiryData[0] }) => (
    <View style={styles.card}>
      <TouchableOpacity onPress={() => toggleExpand(item.id)}>
        <View style={styles.rowBetween}>
          <View style={styles.rowGap}>
            <View
              style={[styles.badge, item.status === '완료' ? styles.badgeDone : styles.badgePending]}
            >
              <Text style={styles.badgeText}>{item.status === '완료' ? '답변완료' : '답변대기'}</Text>
            </View>
            <Text style={styles.date}>{item.date}</Text>
          </View>
          <Image
            source={require('../../assets/icons/arrow_down.png')}
            style={styles.arrowIcon}
          />
        </View>
        <Text style={styles.category}>{item.category}</Text>
        <AppText style={styles.question}>{item.question}</AppText>
      </TouchableOpacity>
      {expandedId === item.id && item.answer && (
        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>답변</Text>
          <AppText style={styles.answerText}>{item.answer}</AppText>
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={inquiryData}
      keyExtractor={item => item.id}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
    />
  );
};

export default InquiryHistory;

const styles = StyleSheet.create({
  listContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    borderWidth: 1,
    borderColor: '#c3c2c2',
    borderRadius: 7,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  rowGap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 5,
  },
  badgeDone: {
    backgroundColor: 'rgba(147, 235, 24, 0.51)',
  },
  badgePending: {
    backgroundColor: '#ededed',
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#000',
  },
  date: {
    fontSize: 13,
    color: '#787878',
  },
  category: {
    fontSize: 14,
    color: '#838383',
    marginBottom: 5,
  },
  question: {
    fontSize: 17,
    color: '#000',
    marginBottom: 5,
  },
  arrowIcon: {
    width: 18,
    height: 18,
  },
  answerBox: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  answerLabel: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000',
  },
  answerText: {
    fontSize: 15,
    color: '#000',
  },
});
