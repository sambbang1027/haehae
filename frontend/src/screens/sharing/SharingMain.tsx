import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomSearchBar from "../../components/common/CustomSearchBar";
import { SharingStackParamList } from "../../navigation/SharingNavigator";
import api from "../../api/AxiosInstance";
import { Timestamp } from "react-native-reanimated/lib/typescript/commonTypes";

interface SharingListItem {
  sharingPostId: number;
  title: string;
  status: 'AVAILABLE' | 'RESERVED' | 'COMPLETED';
  userId: number;
  nickname: string;
  profileImageUrl?: string;
  createdAt: Timestamp;
}

export default function ShairingMain() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<SharingStackParamList>>();
  const [postData, setPostData] = useState<SharingListItem[]>([]);


  useEffect(() => {
    const showListener = Keyboard.addListener('keyboardDidShow', () => setIsKeyboardVisible(true));
    const hideListener = Keyboard.addListener('keyboardDidHide', () => setIsKeyboardVisible(false));
    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/sharing/list/query");
        console.log(res.data);
        setPostData(res.data);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    fetchData();
  }, []);

  const handleSearch = async() => {
    const res = await api.get("/sharing/list/query", {
      params: { keyword: searchQuery}
    });
    setPostData(res.data);
  }

  const getStatusMeta = (status: string) => {
    switch (status) {
      case 'AVAILABLE':
        return { text: '나눔중', color: '#C7F4C2' };
      case 'RESERVED':
        return { text: '예약중', color: '#F4D7A1' };
      case 'COMPLETED':
        return { text: '나눔완료', color: '#E0E0E0' };
      default:
        return { text: '알수없음', color: '#FFFFFF' };
    }
  };

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

        {/* 나눔 카드 리스트 */}
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {postData.map((post) => {
            const { text: statusText, color } = getStatusMeta(post.status);
            return (
              <TouchableOpacity
                key={post.sharingPostId}
                onPress={() => navigation.navigate('SharingDetail', { sharingPostId : post.sharingPostId })}
              >
                <View style={[styles.shairingPostCard, { borderColor: color }]}>
                  <View style={styles.textArea}>
                    <Text style={styles.title}>{post.title}</Text>
                    <View style={styles.metaBox}>
                      <Text style={styles.nickname}>{post.nickname}</Text>
                      <Text style={styles.createdAt}>{post.createdAt}</Text>
                    </View>
                  </View>
                  <View style={[styles.shairingStatus, { backgroundColor: color }]}>
                    <Text style={styles.statusText}>{statusText}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* 글쓰기 버튼 */}
        {!isKeyboardVisible && (
          <TouchableOpacity
            onPress={() => navigation.navigate('WriteSharingPost')}
            style={styles.iconWrapper}
          >
            <Image
              source={require('../../assets/icons/writePostLogo.png')}
              style={styles.icon}
            />
          </TouchableOpacity>
        )}

        {/* 푸터 */}
        {/* {!isKeyboardVisible && <Footer />} */}
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
    paddingBottom: hp('13%'),
  },
  shairingPostCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: wp('3%'),
    borderWidth: 1,
    backgroundColor: '#fff',
    padding: wp('4%'),
    marginBottom: hp('1.5%'),
    minHeight: hp('15%'),
    position: 'relative',
  },
  textArea: {
    flex: 1,
    marginRight: wp('3%'),
    position: 'relative',
    paddingBottom: hp('7%'),
  },
  title: {
    fontSize: wp('4.2%'),
    fontWeight: 'bold',
    marginBottom: hp('0.7%'),
  },
  metaBox: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
  nickname: {
    fontSize: wp('3.2%'),
    color: '#555',
    marginBottom: hp('0.2%'),
  },
  createdAt: {
    fontSize: wp('3.2%'),
    color: '#999',
  },
  shairingStatus: {
    position: 'absolute',
    right: wp('4%'),
    bottom: hp('2%'),
    width: wp('18%'),
    height: hp('4%'),
    borderRadius: wp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusText: {
    fontSize: wp('3.4%'),
    fontWeight: '600',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: hp('16%'),
    right: wp('6%'),
    zIndex: 10,
  },
  icon: {
    width: wp('15%'),
    height: wp('15%'),
  },
});
