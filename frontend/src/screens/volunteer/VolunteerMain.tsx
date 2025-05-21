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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Footer from "../../components/Footer";
import CustomSearchBar from "../../components/CustomSearchBar";
import { VolunteerStackParamList } from "../../navigation/VolunteerNavigator";

export default function VolunteerMain() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<VolunteerStackParamList>>();

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
//         {!isKeyboardVisible && <Footer />}
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
    marginTop: hp('1.2%'),
    paddingHorizontal: wp('4%'),
  },
  scrollContent: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('10%'),
  },
  shairingPostCard: {
    height: hp('15%'),
    borderRadius: wp('3%'),
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
  },
  nickname: {
    fontSize: wp('3.2%'),
    color: '#555',
    marginTop: hp('1.2%'),
  },
  createdAt: {
    fontSize: wp('3.2%'),
    color: '#999',
    marginTop: hp('0.3%'),
  },
  shairingStatus: {
    marginTop: hp('6.5%'),
    width: wp('20%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('3%'),
    borderRadius: wp('5%'),
    alignItems: 'center',
  },
  statusText: {
    fontSize: wp('3.5%'),
    fontWeight: '600',
  },
});
