import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native-elements';

const { height: screenHeight } = Dimensions.get('window');

export default function SharingDetail() {
  const post = {
    title: '중고 세탁기 나눕니다.',
    content: '세탁기 나눕니다. 고장 없음. 직접 오셔서 가져가셔야합니다. \n-잔기스 있음 \n-사용기간 5년 \n-장소: 인천광역시 성북구 무슨역인지 기억안남 \n-일시: 5월 15일 14시',
    nickname: '서샘이',
    createdAt: '2025년 4월 24일',
    category: '가정용품',
    imageUri: 'https://via.placeholder.com/100',
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* 프로필 + 이름 + 날짜 + 아이콘들 */}
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
          <View style={styles.userText}>
            <Text style={styles.nickname}>{post.nickname}</Text>
          </View>
          <Text style={styles.icon}>⋮</Text>
        </View>

        {/* 제목 */}
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.subDate}>{post.createdAt}</Text>
        <Text style={styles.category}>{post.category}</Text>

        <View style={styles.divider} />

        {/* 내용 */}
        <Text style={styles.content}>{post.content}</Text>

        <View style={styles.divider} />

        {/* 이미지 썸네일 */}
        <View style={styles.imageSection}>
          <Image source={{ uri: post.imageUri }} style={styles.thumbnail} />
        </View>
      </ScrollView>

      {/* 하단 고정 버튼 */}
      <TouchableOpacity style={styles.chatBox}>
        <Text style={styles.chatText}>채팅하기</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: screenHeight * 0.13,
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userText: {
    flex: 1,
    marginLeft: 10,
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  icon: {
    fontSize: 40,
    color: '#444',
    paddingHorizontal: 6,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subDate: {
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 4,
  },
  category: {
    fontSize: 13,
    color: '#888',
    marginTop: 10,
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 15,
  },
  content: {
    fontSize: 14,
    lineHeight: 22,
  },
  imageSection: {
    marginTop: 10,
    flexDirection: 'row',
  },
  thumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderColor: '#000',
    borderWidth: 1,
  },
  chatBox: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 50,
    backgroundColor: '#D7F7B5',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
