import React, { useState, useRef,  useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LocalBoardStackParamList } from "../../navigation/LocalBoardNavigator";
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import OptionModal from "../../components/OptionModal";
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type LocalBoardDetailRouteProps = RouteProp<LocalBoardStackParamList, "LocalBoardDetail">;

export default function LocalBoardDetail() {
  const route = useRoute<LocalBoardDetailRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<LocalBoardStackParamList>>();
  const { id } = route.params;
  const modalRef = useRef<BottomSheetModal>(null);
  const optionModalRef = useRef<BottomSheetModal>(null);

  const currentUserId = 1001; // 로그인한 사용자 ID
  
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

  const postingInfo = [
    {
      id: 1,
      authorId: 1001,
      author: '서샘이',
      date: '2025년 4월 24일',
      title: '광주 vs 광주',
      content: '경기도 광주 vs 광주광역시 누가 더 시골이라고 생각하시나요?',
      image: 'https://via.placeholder.com/350x200',
    },
  ];

  const post = postingInfo.find((p) => p.id === id);

  const postingComment = [
    {
      id: 1,
      authorId: 1002,
      author: '강재현',
      date: '2025년 4월 24일 오후 3시 52분',
      content: '경기도가 더 도시입니다. 불만있으면 한 판 뜨든가',
      image: null,
      replies: [
        {
          id: 11,
          authorId: 1001,
          author: '서샘이',
          date: '2025년 4월 24일 오후 4시 02분',
          content: '140만명의 광주시민의 저항을 받고싶으세요?',
          image: null,
        },
      ],
    },
    {
      id: 2,
      authorId: 1003,
      author: '윤태현',
      date: '2025년 4월 24일 오후 4시 10분',
      content: '군포가 더 시골입니다',
      image: null,
      replies: [],
    },
  ];

  const goToReplyScreen = (commentId: number) => {
    navigation.navigate("LocalBoardReplyStack", {
      screen: "LocalBoardReply",
      params: { commentId },
    });
  };

  const renderComments = () => {
    return postingComment.map((comment) => (
      <View key={comment.id} style={styles.commentBox}>
        <View style={styles.commentHeaderRow}>
          <Image source={require('../../assets/icons/defaultProfile.png')} style={styles.commentProfile} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={styles.commentTopRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentDate}> {comment.date}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => goToReplyScreen(comment.id)}>
                  <Text style={styles.replyButton}>답글</Text>
                </TouchableOpacity>
                {comment.authorId !== currentUserId && (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("ReportScreen", {
                        type: "comment",
                        commentId: comment.id,
                      })
                    }
                    style={{ marginLeft: 12 }}
                  >
                    <Text style={styles.reportButton}>신고</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
            <Text style={styles.commentText}>{comment.content}</Text>
            {comment.image && (
              <Image source={{ uri: comment.image }} style={styles.commentImage} />
            )}
          </View>
        </View>

        {comment.replies.map((reply) => (
          <View key={reply.id} style={styles.replyBox}>
            <Image source={require('../../assets/icons/defaultProfile.png')} style={styles.replyProfile} />
            <View style={styles.replyContent}>
              <View style={styles.commentTopRow}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.commentAuthor}>{reply.author}</Text>
                  <Text style={styles.commentDate}> {reply.date}</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.deleteButton}>삭제</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.commentText}>{reply.content}</Text>
              {reply.image && (
                <Image source={{ uri: reply.image }} style={styles.commentImage} />
              )}
            </View>
          </View>
        ))}
      </View>
    ));
  };

  if (!post) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>해당 게시글을 찾을 수 없습니다.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.authorContainer}>
            <Image source={require('../../assets/icons/defaultProfile.png')} style={styles.profile} />
            <View style={styles.authorText}>
              <Text style={styles.authorName}>{post.author}</Text>
            </View>
          </View>

          <View style={styles.separator} />
          <Text style={styles.title}>{post.title}</Text>
          <Text style={styles.date}>{post.date}</Text>
          <Text style={styles.content}>{post.content}</Text>

          {post.image && (
            <Image source={{ uri: post.image }} style={styles.postImage} />
          )}

          <View style={styles.separator} />
          <Text style={styles.commentHeader}>댓글</Text>
          {renderComments()}
        </ScrollView>

        <View style={styles.inputBar}>
          <TextInput style={styles.input} placeholder="댓글을 작성해주세요." />
          <TouchableOpacity>
            <Text style={styles.send}>➤</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <OptionModal
        ref={optionModalRef}
        isAuthor={post.authorId === currentUserId}
        postId={post.id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('13%'),
  },

  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profile: {
    width: wp('16%'),
    height: wp('16%'),
    borderRadius: wp('6%'),
  },
  authorText: {
    marginLeft: wp('2.5%'),
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: wp('4.5%'),
  },
  date: {
    color: '#888',
    fontSize: wp('3%'),
  },
  options: {
    marginLeft: 'auto',
    padding: wp('2.5%'),
  },
  optionsIcon: {
    fontSize: wp('7%'),
  },

  title: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    marginTop: hp('2%'),
  },
  content: {
    fontSize: wp('4%'),
    marginVertical: hp('2%'),
  },
  postImage: {
    width: '100%',
    height: hp('25%'),
    borderRadius: wp('2%'),
  },
  separator: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginVertical: hp('2.5%'),
  },

  commentHeader: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginBottom: hp('1.5%'),
  },
  commentBox: {
    marginBottom: hp('2.5%'),
  },
  commentHeaderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  commentProfile: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
  },
  commentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('0.5%'),
  },
  commentAuthor: {
    fontWeight: 'bold',
  },
  commentDate: {
    fontSize: wp('3%'),
    color: '#777',
    marginLeft: wp('2%'),
  },
  commentText: {
    fontSize: wp('3.8%'),
    marginBottom: hp('0.5%'),
  },
  commentImage: {
    width: wp('25%'),
    height: hp('10%'),
    borderRadius: wp('1.5%'),
    marginBottom: hp('0.5%'),
  },
  replyButton: {
    fontSize: wp('3.3%'),
    color: '#555',
  },
  reportButton: {
    fontSize: wp('3.3%'),
    color: '#d00',
  },

  replyBox: {
    flexDirection: 'row',
    marginLeft: wp('10%'),
    marginTop: hp('1%'),
  },
  replyProfile: {
    width: wp('6.5%'),
    height: wp('6.5%'),
    borderRadius: wp('3.25%'),
  },
  replyContent: {
    marginLeft: wp('2.5%'),
    flex: 1,
  },
  deleteButton: {
    fontSize: wp('3.3%'),
    color: '#d00',
  },

  inputBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: wp('2.5%'),
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    paddingHorizontal: wp('2.5%'),
  },
  send: {
    fontSize: wp('5%'),
    paddingHorizontal: wp('2.5%'),
  },
});
