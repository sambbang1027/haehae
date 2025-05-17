import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from "../../navigation/types";
import Footer from "../../components/layouts/Footer";
import CustomSearchBar from "../../components/common/CustomSearchBar";

export default function VolunteerMain() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleSearch = () => {
    console.log('검색 실행:', searchQuery);
  };

  const postData = [
    { id: 1, title: '서울시 담배꽁초 줍기 봉사', nickname: '서울시청', status: '모집중', color: '#C7F4C2', createdAt: '2025-05-01' },
    { id: 2, title: '중고 아나바다 캠페인', nickname: '서울시 강남구청', status: '모집중', color: '#C7F4C2', createdAt: '2025-04-30' },
    { id: 3, title: '서울 한강 쓰레기 줍기', nickname: '서울시 송파구청', status: '모집완료', color: '#E0E0E0', createdAt: '2025-04-28' },
    { id: 4, title: '중고 DIY 클래스 봉사자 모집', nickname: '서울시청', status: '모집완료', color: '#E0E0E0', createdAt: '2025-04-25' },
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
        style={styles.container}
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

        {/* 봉사 카드 리스트 */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {postData.map((post) => (
            <TouchableOpacity
              key={post.id}
              onPress={() => navigation.navigate('VolunteerDetail', { id: post.id })}
            >
              <View style={[styles.shairingPostCard, { borderColor: post.color }]}>
                <View style={styles.textArea}>
                  <Text style={styles.title}>{post.title}</Text>
                  <Text style={styles.nickname}>{post.nickname}</Text>
                  <Text style={styles.createdAt}>{post.createdAt}</Text>
                </View>
                <View style={[styles.shairingStatus, { backgroundColor: post.color }]}>
                  <Text style={styles.statusText}>{post.status}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 푸터 */}
        {!isKeyboardVisible && <Footer />}
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
    marginTop: 10,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  shairingPostCard: {
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  nickname: {
    fontSize: 12,
    color: '#555',
    marginTop: 10,
  },
  createdAt: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  shairingStatus: {
    marginTop: 50,
    width: 80,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
  },
});
