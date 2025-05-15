import React, { useState } from "react";
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
import { RouteProp, useRoute } from '@react-navigation/native';
import { LocalBoardStackParamList } from "../../navigation/LocalBoardNavigator";

type LocalBoardDetailRouteProps = RouteProp<LocalBoardStackParamList, "LocalBoardDetail">;

export default function LocalBoardDetail() {
  const route = useRoute<LocalBoardDetailRouteProps>();
  // const { setPostingInfo, postingInfo} = useState([]); axios를 통해서 받아올 게시물 정보
  // const { setPostingComment, postingComment} = useState([]); axios를 통해서 받아올 게시물 댓글
  // const { setLeaveComment, LeaveComment} = useState(''); axios를 통해서 댓글 저장
  // const { setLeaveReply, LeaveReply } = useState(''); axios를 통해서 대댓글 저장 생각해보니깐 대댓글 페이지를 만들어야 되네;;? ㅅㅂㅂ
  const { id } = route.params; //LocalBoardMain에서 param값 전달

  //postingInfo 더미데이터
  const postingInfo = [
    {
      id: 1,
      author: '서샘이',
      date: '2025년 4월 24일',
      title: '서샘이의 광주 VS 강재현의 광주 누가 더 시골인인가요?',
      content: '경기도 광주는 CGV도 없다면서요? Fact인가요?',
      image: 'https://via.placeholder.com/350x200',
    },
  ];

  //param으로 넘어온 id와 post내의 id가 일치하는 아이디 여부 확인인
  const post = postingInfo.find((p) => p.id === id);

  //postingComment(대댓글까지 포함됨) 더미데이터
  const postingComment = [
    {
      id: 1,
      author: '강재현',
      date: '2025년 4월 24일 오후 3시 52분',
      content: '경기도가 더 도시입니다. 불만있으면 한 판 뜨든가',
      image: null,
      replies: [
        {
          id: 11,
          author: '서쌤이',
          date: '2025년 4월 24일 오후 4시 02분',
          content: '140만명의 광주시민의 저항을 받고싶으세요?',
          image: null,
        },
      ],
    },
    {
      id: 2,
      author: '윤태현',
      date: '2025년 4월 24일 오후 4시 10분',
      content: '군포가 더 시골입니다',
      image: null,
      replies: [],
    },
  ];

  const renderComments = () => {
    return postingComment.map((comment) => (
      <View key={comment.id} style={styles.commentBox}>
        <View style={styles.commentHeaderRow}>
          <Image source={require('../../assets/defaultProfile.png')} style={styles.commentProfile} />
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={styles.commentTopRow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.commentAuthor}>{comment.author}</Text>
                <Text style={styles.commentDate}> {comment.date}</Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.replyButton}>답글</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.commentText}>{comment.content}</Text>
            {comment.image && (
              <Image source={{ uri: comment.image }} style={styles.commentImage} />
            )}
          </View>
        </View>

        {/* 대댓글 */}
        {comment.replies.map((reply) => (
          <View key={reply.id} style={styles.replyBox}>
            <Image source={require('../../assets/defaultProfile.png')} style={styles.replyProfile} />
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
          {/* 작성자 영역 */}
          <View style={styles.authorContainer}>
            <Image source={require('../../assets/defaultProfile.png')} style={styles.profile} />
            <View style={styles.authorText}>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.date}>{post.date}</Text>
            </View>
            <TouchableOpacity style={styles.options}>
              <Text>⋮</Text>
            </TouchableOpacity>
          </View>

          {/* 제목 및 본문 */}
          <Text style={styles.title}>{post.title}</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  scrollContent: { padding: 20, paddingBottom: 100 },

  authorContainer: { flexDirection: 'row', alignItems: 'center' },
  profile: { width: 50, height: 50, borderRadius: 25 },
  authorText: { marginLeft: 10 },
  authorName: { fontWeight: 'bold' },
  date: { color: '#888', fontSize: 12 },
  options: { marginLeft: 'auto', padding: 10 },

  title: { fontSize: 18, fontWeight: 'bold', marginTop: 20 },
  content: { fontSize: 16, marginVertical: 15 },
  postImage: { width: '100%', height: 200, borderRadius: 8 },
  separator: { borderBottomWidth: 1, borderColor: '#ccc', marginVertical: 20 },

  commentHeader: { fontWeight: 'bold', fontSize: 16, marginBottom: 10 },
  commentBox: { marginBottom: 20 },
  commentHeaderRow: { flexDirection: 'row', alignItems: 'flex-start' },
  commentProfile: { width: 30, height: 30, borderRadius: 15 },
  commentTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  commentAuthor: { fontWeight: 'bold' },
  commentDate: { fontSize: 12, color: '#777', marginLeft: 8 },
  commentText: { fontSize: 15, marginBottom: 4 },
  commentImage: { width: 100, height: 80, borderRadius: 6, marginBottom: 4 },
  replyButton: { fontSize: 13, color: '#555' },

  replyBox: { flexDirection: 'row', marginLeft: 40, marginTop: 10 },
  replyProfile: { width: 25, height: 25, borderRadius: 12.5 },
  replyContent: { marginLeft: 10, flex: 1 },
  deleteButton: { fontSize: 13, color: '#d00' },

  inputBar: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: { flex: 1, paddingHorizontal: 10 },
  send: { fontSize: 20, paddingHorizontal: 10 },
});
