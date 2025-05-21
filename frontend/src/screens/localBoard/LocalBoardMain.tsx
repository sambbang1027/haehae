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
    },
    {
      id: 2,
      author: '김도훈',
      date: '2025년 4월 24일',
      content: '같이 봉사하실 분 구합니다.',
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
                  <Image
                    source={require('../../assets/defaultProfile.png')}
                    style={styles.profileImage}
                  />
                  <Text style={styles.author}>{post.author}</Text>
                </View>
                <Text style={styles.content}>{post.content}</Text>
                <Text style={styles.date}>{post.date}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {!isKeyboardVisible && (
          <TouchableOpacity onPress={() => navigation.navigate('WriteLocalPost')}>
            <Image
              source={require('../../assets/writePostLogo.png')}
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
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  postCard: {
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    minHeight: 120,
    position: 'relative',
  },
  profileWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 12,
    marginRight: 8,
  },
  author: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  content: {
    fontSize: 14,
    lineHeight: 20,
  },
  date: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    fontSize: 12,
    color: '#888',
  },
  footerWrapper: {
    width: '100%',
  },
  icon: {
    position: 'absolute',
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    zIndex: 10,
  },
});
