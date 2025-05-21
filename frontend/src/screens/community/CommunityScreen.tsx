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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
              source={require('../../assets/icons/localBoardEntry.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>우리동네</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('VolunteerStack', {screen: 'VolunteerMain',})}
            style={styles.rectangleBox}
          >
            <Image
              source={require('../../assets/icons/volunteerEntry.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>봉사</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('SharingStack', {screen: 'SharingMain'})}
            style={styles.rectangleBox}
          >
            <Image
              source={require('../../assets/icons/sharingEntry.png')}
              style={styles.icon}
            />
            <Text style={styles.title}>나눔</Text>
          </TouchableOpacity>
          <View style={styles.rectangleBox}>
            <Image
              source={require('../../assets/icons/chatEntry.png')}
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
    padding: wp('5%'),
    paddingBottom: hp('15%'),
  },
  div4: {
    fontSize: wp('5%'),
    fontWeight: '700',
    opacity: 0.5,
    marginBottom: hp('1.5%'),
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: hp('2.5%'),
  },
  rectangleBox: {
    backgroundColor: '#ffffff',
    borderRadius: wp('2.5%'),
    borderWidth: 1,
    borderColor: '#ccc',
    width: '48%',
    height: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
    padding: wp('2.5%'),
  },
  icon: {
    width: wp('20%'),
    height: wp('20%'),
    marginBottom: hp('1%'),
  },
  title: {
    fontSize: wp('4%'),
    fontWeight: '600',
  },
  div5: {
    fontSize: wp('5%'),
    fontWeight: '700',
    opacity: 0.5,
    marginBottom: hp('1.5%'),
  },
  postRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('0.8%'),
    borderBottomWidth: 1,
    borderColor: '#eee',
    gap: wp('2%'),
  },
  badge: {
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('5%'),
    borderWidth: 1,
    flexShrink: 0,
  },
  badgeText: {
    fontSize: wp('3.2%'),
    fontWeight: '700',
  },
  post: {
    fontSize: wp('3.2%'),
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
