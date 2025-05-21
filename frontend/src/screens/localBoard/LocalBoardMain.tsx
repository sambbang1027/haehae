import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Footer from '../../components/Footer';
import CustomSearchBar from '../../components/CustomSearchBar';
import { LocalBoardStackParamList } from '../../navigation/LocalBoardNavigator';

export default function LocalBoardMain() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<LocalBoardStackParamList>>();

  const handleSearch = () => {
    console.log('검색 실행:', searchQuery);
  };

  const posts = [
    {
      id: 1,
      author: '서샘이',
      date: '2025년 4월 24일',
      content: '서샘이의 광주 VS 강재현의 광주 누가 더 시골인인가요?',
      commentCount: 3,
    },
    {
      id: 2,
      author: '김도훈',
      date: '2025년 4월 24일',
      content: '같이 봉사하실 분 구합니다.',
      commentCount: 2,
    },
    {
      id: 3,
      author: '김도훈',
      date: '2025년 4월 24일',
      content: '이거 어떻게 버려요?',
    },
    {
      id: 4,
      author: '도레미재헌',
      date: '2025년 4월 24일',
      content: '도레미라고 말했다.',
    },
  ];

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setIsKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setIsKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* 검색창 */}
        <View style={styles.searchWrapper}>
          <CustomSearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onSubmit={handleSearch}
          />
        </View>

        {/* 게시글 리스트 */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {posts.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => navigation.navigate('LocalBoardDetail', { id: post.id })}
            >
              <View style={styles.postCard}>
                <View style={styles.profileWrapper}>
                  <View style={styles.userInfo}>
                    <Image
                      source={require('../../assets/icons/defaultProfile.png')}
                      style={styles.profileImage}
                    />
                    <Text style={styles.author}>{post.author}</Text>
                  </View>
                </View>

                <Text style={styles.content}>{post.content}</Text>

                <View style={styles.dateRow}>
                  <Text style={styles.date}>{post.date}</Text>
                  {post.commentCount !== undefined && (
                    <View style={styles.commentCountWrapper}>
                      <Image
                        source={require('../../assets/icons/commentCount.png')}
                        style={styles.commentIcon}
                      />
                      <Text style={styles.commentText}>{post.commentCount}</Text>
                    </View>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {!isKeyboardVisible && (
          <TouchableOpacity onPress={() => navigation.navigate('WriteLocalPost')}>
            <Image
              source={require('../../assets/icons/writePostLogo.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        <View style={styles.footerWrapper}>
          {!isKeyboardVisible && <Footer />}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchWrapper: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('1%'),
  },
  scrollContent: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('8%'),
  },
  postCard: {
    backgroundColor: '#FFF',
    padding: wp('4%'),
    borderRadius: wp('2.5%'),
    marginBottom: hp('1.2%'),
    minHeight: hp('18%'),
    position: 'relative',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: hp('1%'),
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4.5%'),
    marginRight: wp('2.5%'),
  },
  author: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  content: {
    fontSize: wp('3.8%'),
    lineHeight: hp('3%'),
  },
  dateRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
  date: {
    fontSize: wp('3.2%'),
    color: '#888',
  },
  commentCountWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
  },
  commentIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginRight: wp('1%'),
  },
  commentText: {
    fontSize: wp('4%'),
    color: '#333',
  },
  footerWrapper: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    bottom: hp('4%'),
    right: wp('5%'),
    width: wp('15%'),
    height: wp('15%'),
    zIndex: 10,
  },
});

