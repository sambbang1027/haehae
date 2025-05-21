import { useRoute, RouteProp } from '@react-navigation/native';
import { ScrollView, Text, View, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { LocalBoardReplyStackParamList } from '../../navigation/LocalBoardReplyNavigator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const dummyComments = [
  {
    id: 1,
    author: '강재현',
    date: '2025년 4월 24일 오후 3시 52분',
    content: '경기도가 더 도시입니다. 불만있으면 한 판 뜨든가',
    replies: [
      {
        id: 11,
        author: '서쌤이',
        date: '2025년 4월 24일 오후 4시 02분',
        content: '140만명의 광주시민의 저항을 받고싶으세요?',
      },
    ],
  },
  {
    id: 2,
    author: '윤태현',
    date: '2025년 4월 24일 오후 4시 10분',
    content: '군포가 더 시골입니다',
    replies: [],
  },
];

type LocalBoardReplyRouteProps = RouteProp<LocalBoardReplyStackParamList, 'LocalBoardReply'>;

export default function LocalBoardReply() {
  const route = useRoute<LocalBoardReplyRouteProps>();
  const { commentId } = route.params;

  const selectedComment = dummyComments.find((c) => c.id === commentId);

  if (!selectedComment) {
    return <Text>댓글을 찾을 수 없습니다.</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={{ flex: 1, justifyContent: 'space-between' }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20 }}>
            {/* 원댓글 */}
            <View style={styles.commentBox}>
              <Image source={require('../../assets/icons/defaultProfile.png')} style={styles.profile} />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.author}>{selectedComment.author}</Text>
                <Text style={styles.date}>{selectedComment.date}</Text>
                <Text style={styles.content}>{selectedComment.content}</Text>
              </View>
            </View>

            {/* 대댓글 */}
            {selectedComment.replies.map((reply) => (
              <View key={reply.id} style={styles.replyBox}>
                <Image source={require('../../assets/icons/defaultProfile.png')} style={styles.profile} />
                <View style={{ marginLeft: 10 }}>
                  <Text style={styles.author}>{reply.author}</Text>
                  <Text style={styles.date}>{reply.date}</Text>
                  <Text style={styles.content}>{reply.content}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* 입력창 */}
          <View style={styles.inputBar}>
            <TextInput style={styles.input} placeholder="답글을 작성해주세요." />
            <TouchableOpacity>
              <Text style={styles.send}>➤</Text>
            </TouchableOpacity>
          </View>
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
  commentBox: {
    flexDirection: 'row',
    marginBottom: hp('2.5%'),
  },
  replyBox: {
    flexDirection: 'row',
    marginLeft: wp('10%'),
    marginBottom: hp('1.5%'),
  },
  profile: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('4%'),
  },
  author: {
    fontWeight: 'bold',
    fontSize: wp('3.8%'),
  },
  date: {
    color: '#999',
    fontSize: wp('3%'),
  },
  content: {
    fontSize: wp('4%'),
    marginTop: hp('0.5%'),
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

