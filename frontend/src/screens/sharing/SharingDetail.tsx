import React, { useLayoutEffect, useRef } from 'react';
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
import { useNavigation } from '@react-navigation/native';
import { SharingStackParamList } from '../../navigation/SharingNavigator';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import OptionModal from '../../components/OptionModal';
const { height: screenHeight } = Dimensions.get('window');

export default function SharingDetail() {
  const navigation = useNavigation<NativeStackNavigationProp<SharingStackParamList>>();
  const optionModalRef = useRef<BottomSheetModal>(null);
  const post = {
    title: '중고 세탁기 나눕니다.',
    content: '세탁기 나눕니다. 고장 없음. 직접 오셔서 가져가셔야합니다. \n-잔기스 있음 \n-사용기간 5년 \n-장소: 인천광역시 성북구 무슨역인지 기억안남 \n-일시: 5월 15일 14시',
    nickname: '서샘이',
    createdAt: '2025년 4월 24일',
    category: '가정용품',
    imageUri: 'https://via.placeholder.com/100',
  };

  //옵션 모달 활성화
  const activeOptionModal = () =>{
    optionModalRef.current?.present()
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
      <TouchableOpacity onPress={()=>{activeOptionModal()}} style={{marginRight:20}}>
        <Text style={{ fontSize: 25, fontWeight:'bold' }}>⁝</Text>
      </TouchableOpacity>
      ),
      title:'',
      headerShadowVisible:false,
    });
  },[navigation])
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {/* 프로필 + 이름 + 날짜 + 아이콘들 */}
        <View style={styles.header}>
          <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.avatar} />
          <View style={styles.userText}>
            <Text style={styles.nickname}>{post.nickname}</Text>
          </View>
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
      <TouchableOpacity style={styles.chatBox} onPress={()=>navigation.navigate('ChatingStack', {screen: 'ChatingDetail',})}>
        <Text style={styles.chatText}>채팅하기</Text>
      </TouchableOpacity>
      <OptionModal ref={optionModalRef} isAuthor={false} postId={1} />
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
  },
  thumbnail: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('3%'),
    borderColor: '#000',
    borderWidth: 1,
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

