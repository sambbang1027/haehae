import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Image } from 'react-native-elements';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import OptionModal from '../../components/OptionModal';
import { SharingStackParamList } from '../../navigation/SharingNavigator';
import api from '../../api/AxiosInstance';

const { height: screenHeight } = Dimensions.get('window');

interface SharingDetailResponse {
  content: {
    userId: number;
    sharingPostId: number;
    nickname: string;
    profileImgUrl?: string;
    category: string;
    title: string;
    description: string;
    createdAt: string;
  };
  images: {
    sharingImageId: number;
    sharingPostId: number;
    imgUrl: string;
  }[];
}

export default function SharingDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<SharingStackParamList>>();
  const optionModalRef = useRef<BottomSheetModal>(null);
  const [post, setPost] = useState<SharingDetailResponse | null>(null);
  const route = useRoute<RouteProp<SharingStackParamList, 'SharingDetail'>>();
  const { sharingPostId } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get(`/sharing/detail/query/${sharingPostId}`);
        setPost(res.data);
      } catch (error) {
        console.error('에러 발생:', error);
      }
    };
    fetchData();
  }, []);


  const goChatRoom = async() => {
      if(!post){
        console.log("아직 들어온 데이터가 없습니다.");
        return;
      }
      const res =  await api.post('/chat/exist',{sharingPostId: post.content.sharingPostId, sellerId: post.content.userId});
      const chatRoomId = res.data.chatRoomId;
      const sharingPostId = post.content.sharingPostId;
      const sellerId = res.data.sellerId;


      navigation.navigate('ChatingStack', {
      screen: 'ChatingDetail',
      params: { chatRoomId, sharingPostId, sellerId },
    });
  };

  

  const activeOptionModal = () => {
    optionModalRef.current?.present();
  };

//   const handleReportPress = () => {
//       optionModalRef.current?.dismiss();
//       navigation.navigate('ReportScreen', {
//         type: 'sharing',
//         sharingId: sharing?.id,
//     });
// };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={activeOptionModal} style={{ marginRight: 20 }}>
          <Text style={{ fontSize: 25, fontWeight: 'bold' }}>⁝</Text>
        </TouchableOpacity>
      ),
      title: '',
      headerShadowVisible: false,
    });
  }, [navigation]);

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {post ? (
          <>
            {/* 프로필 영역 */}
            <View style={styles.header}>
              <Image
                source={{ uri: post.content.profileImgUrl || 'https://via.placeholder.com/40' }}
                style={styles.avatar}
              />
              <View style={styles.userText}>
                <Text style={styles.nickname}>{post.content.nickname}</Text>
              </View>
            </View>

            {/* 제목 / 날짜 / 카테고리 */}
            <Text style={styles.title}>{post.content.title}</Text>
            <Text style={styles.subDate}>{formatDate(post.content.createdAt)}</Text>
            <Text style={styles.category}>{post.content.category}</Text>

            <View style={styles.divider} />
            <Text style={styles.content}>{post.content.description}</Text>
            <View style={styles.divider} />

            {/* 이미지 섹션 */}
            <View style={styles.imageSection}>
              {post.images.map((img) => (
                <Image
                  key={img.sharingImageId}
                  source={{ uri: img.imgUrl }}
                  style={styles.thumbnail}
                />
              ))}
            </View>
          </>
        ) : (
          <Text style={{ textAlign: 'center', marginTop: 20 }}>게시글을 불러오는 중입니다.</Text>
        )}
      </ScrollView>

      {/* 하단 버튼 */}
      <TouchableOpacity
        style={styles.chatBox}
        onPress={goChatRoom}
      >
        <Text style={styles.chatText}>채팅하기</Text>
      </TouchableOpacity>

      {/* 옵션 모달 */}
      <OptionModal
        ref={optionModalRef}
        isAuthor={false}
        postId={post?.content.sharingPostId ?? 0}
      />
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
    paddingHorizontal: wp('5%'),
  },
  scrollContent: {
    paddingBottom: hp('13%'),
    paddingTop: hp('2.5%'),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  avatar: {
    width: wp('15%'),
    height: wp('15%'),
    borderRadius: wp('7.5%'),
  },
  userText: {
    flex: 1,
    marginLeft: wp('2.5%'),
  },
  nickname: {
    fontWeight: 'bold',
    fontSize: wp('5%'),
  },
  title: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
  subDate: {
    fontSize: wp('3%'),
    fontWeight: 'bold',
    marginTop: hp('0.5%'),
  },
  category: {
    fontSize: wp('3.3%'),
    color: '#888',
    marginTop: hp('1.2%'),
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: hp('2%'),
  },
  content: {
    fontSize: wp('3.7%'),
    lineHeight: hp('3.3%'),
  },
  imageSection: {
    marginTop: hp('1.2%'),
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2%'),
  },
  thumbnail: {
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('3%'),
    borderColor: '#000',
    borderWidth: 1,
    marginBottom: hp('1.5%'),
  },
  chatBox: {
    position: 'absolute',
    bottom: hp('2.5%'),
    left: wp('5%'),
    right: wp('5%'),
    height: hp('6.5%'),
    backgroundColor: '#D7F7B5',
    borderRadius: wp('12.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatText: {
    color: 'black',
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
  },
});
