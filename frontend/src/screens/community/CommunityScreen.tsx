import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Footer from '../../components/Footer';
import MainHeader from '../../components/MainHeader';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CommuntiyStackParamList } from '../../navigation/CommunityNavigator';

type PostSummary = {
  id: number;
  type: 'volunteer' | 'sharing' | 'local';
  title: string;
  created_at: string;
};

export default function CommunityScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<CommuntiyStackParamList>>();

  const moveToDetail = (post: PostSummary) => {
    switch (post.type) {
      case 'volunteer':
        navigation.navigate('VolunteerDetail', { id: post.id });
        break;
      case 'sharing':
        navigation.navigate('SharingDetail', { id: post.id });
        break;
      case 'local':
        navigation.navigate('LocalBoardDetail', { id: post.id });
        break;
    }
  };

  const latestPosts: PostSummary[] = [
    {
      id: 1,
      title: '서샘이의 광주 VS 강재현의 광주 누가 더 시골인인가요?',
      type: 'local',
      created_at: '2025-04-24',
    },
    {
      id: 2,
      title: '노트북 나눔해요.',
      type: 'sharing',
      created_at: '2025-05-07',
    },
    {
      id: 3,
      title: '서울시 담배꽁초 줍기 봉사활동',
      type: 'volunteer',
      created_at: '2025-05-07',
    },
    {
      id: 4,
      title: '중고 아나바다 캠페인',
      type: 'volunteer',
      created_at: '2025-05-07',
    },
  ];

  const getBadgeProps = (type: PostSummary['type']) => {
    switch (type) {
      case 'local':
        return { text: '우리동네', color: '#E5F6FA', textColor: '#007B9E' };
      case 'sharing':
        return { text: '중고나눔', color: '#FFF4CE', textColor: '#8B6F00' };
      case 'volunteer':
        return { text: '봉사활동', color: '#E4F8D6', textColor: '#508000' };
      default:
        return { text: '', color: '#ccc', textColor: '#000' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <MainHeader />
        <Text style={styles.div4}>게시판</Text>

        {/* 네비게이션 박스 */}
        <View style={styles.grid}>
          <TouchableOpacity
            onPress={() =>navigation.navigate('LocalBoardStack', {screen: 'LocalBoardMain',})}
            style={styles.rectangleBox}>
            <Image
              source={require('../../assets/localBoardEntry.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>우리동네</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('VolunteerStack', {screen: 'VolunteerMain',})}
            style={styles.rectangleBox}
          >
            <Image
              source={require('../../assets/volunteerEntry.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>봉사</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SharingStack', {screen: 'SharingMain'})}
            style={styles.rectangleBox}
          >
            <Image
              source={require('../../assets/sharingEntry.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>나눔</Text>
          </TouchableOpacity>
          <View style={styles.rectangleBox}>
            <Image
              source={require('../../assets/chatEntry.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>채팅</Text>
          </View>
        </View>

        {/* 최신 등록 글 */}
        <Text style={styles.div5}>최신 등록 글</Text>
        {latestPosts.map((post) => {
          const { text, color, textColor } = getBadgeProps(post.type);
          return (
            <TouchableOpacity
              onPress={() => moveToDetail(post)}
              key={`${post.type}-${post.id}`}
            >
              <View style={styles.postRow}>
                <View
                  style={[
                    styles.badge,
                    { backgroundColor: color, borderColor: textColor },
                  ]}
                >
                  <Text style={[styles.badgeText, { color: textColor }]}>
                    {text}
                  </Text>
                </View>
                <Text
                  style={styles.post}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {post.title}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <View style={styles.footerWrapper}>
        <Footer />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 120,
  },
  div4: {
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.5,
    marginBottom: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rectangleBox: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    width: '48%',
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    padding: 10,
  },
  icon: {
    width: 75,
    height: 75,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
  },
  div5: {
    fontSize: 20,
    fontWeight: '700',
    opacity: 0.5,
    marginBottom: 10,
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    borderWidth: 1,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  post: {
    fontSize: 12,
    flexShrink: 1,
    flexGrow: 1,
    flexBasis: 'auto',
  },
  footerWrapper: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
