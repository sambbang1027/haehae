import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useLayoutEffect, useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ChatStackParamList } from '../../navigation/ChatNavigator';
import { useNavigation } from '@react-navigation/native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import OptionModal from '../../components/OptionModal';

type Message = {
  id: number;
  text: string;
  sender: 'me' | 'other';
  nickname: string;
  time: string;
  profileImage: string;
};

export default function ChatInputArea() {
  const navigation = useNavigation<NativeStackNavigationProp<ChatStackParamList>>();
  const [text, setText] = useState('');
  const [inputHeight, setInputHeight] = useState(40);
  const optionModalRef = useRef<BottomSheetModal>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: '나눔받고 싶어요!',
      sender: 'me',
      nickname: '나',
      time: '오후 3:00',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
    },
    {
      id: 2,
      text: '네! 언제가 편하실까요?',
      sender: 'other',
      nickname: '서샘이',
      time: '오후 3:01',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/236/236831.png',
    },
    {
      id: 3,
      text: '5시까지 갈게요!',
      sender: 'me',
      nickname: '나',
      time: '오후 3:02',
      profileImage: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
    },
  ]);

  //옵션 모달 활성화
  const activeOptionModal = () =>{
    optionModalRef.current?.present()
  };

  //상단 헤더 바, ⁝를 분리
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
  }, [navigation])

  const handleSend = () => {
    if (text.trim().length === 0) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text,
      sender: 'me',
      nickname: '나',
      time: '오후 3:10', // 실제 앱에서는 Date 처리
      profileImage: 'https://cdn-icons-png.flaticon.com/512/2202/2202112.png',
    };

    setMessages((prev) => [...prev, newMessage]);
    setText('');
    setInputHeight(40);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      >
        <View style={{ flex: 1 }}>
          {/* ✅ 상단 postBox */}
          <View style={styles.postBox}>
            <Text style={styles.postTitle}>중고 세탁기 나눕니다.</Text>
            <Text style={styles.postCategory}>가전</Text>
            <ScrollView horizontal>
              <View style={styles.postImageBox}>
                  <Image
                    source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1046/1046857.png' }}
                    style={styles.postImage}
                    resizeMode="contain"
                  />
              </View>
            </ScrollView>
          </View>

          {/* ✅ 채팅 메시지 목록 */}
          <FlatList
            data={messages}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.messageContainer,
                  item.sender === 'me' ? { alignItems: 'flex-end' } : { alignItems: 'flex-start' },
                ]}
              >
                <View style={styles.senderInfo}>
                  {item.sender === 'other' && (
                    <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
                  )}
                  <Text style={styles.nickname}>{item.nickname}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <View
                  style={[
                    styles.messageBubble,
                    item.sender === 'me' ? styles.myMessage : styles.otherMessage,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              </View>
            )}
            contentContainerStyle={{ padding: 10 }}
          />

          {/* ✅ 입력창 */}
          <View style={styles.chatContainer}>
            <TextInput
              value={text}
              onChangeText={setText}
              style={[styles.input, { height: Math.min(inputHeight, 120) }]}
              multiline
              placeholder="메시지를 입력하세요"
              onContentSizeChange={(e) => {
                setInputHeight(e.nativeEvent.contentSize.height);
              }}
            />
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Text style={{ color: '#000' }}>전송</Text>
            </TouchableOpacity>
          </View>
        </View>
        <OptionModal ref={optionModalRef} isAuthor={false} postId={1} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  postBox: {
    height: 150,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postCategory: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  postImageBox: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  postImage: {
    width: 50,
    height: 50,
  },
  chatContainer: {
    flexDirection: 'row',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
    alignItems: 'flex-end',
    backgroundColor: '#fff',
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 120,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: 'top',
    backgroundColor: '#f9f9f9',
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: '#DCEAA2',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  messageContainer: {
    marginVertical: 6,
  },
  senderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  nickname: {
    fontSize: 13,
    marginHorizontal: 6,
    color: '#555',
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  profileImage: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 15,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCEAA2',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: '#e5e5ea',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
});
