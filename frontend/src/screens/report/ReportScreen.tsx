import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { RouteProp, useRoute } from '@react-navigation/native';
import api from '../../api/AxiosInstance';
import { useUser } from '../../context/UserContext';
import { useNavigation } from '@react-navigation/native';
import { useModal } from '../../context/ModalContext';



const categories = ['스팸홍보/도배글입니다.', '음란물 또는 불법 촬영물입니다.', '불법 정보를 포함하고 있습니다.', '청소년에게 유해한 내용입니다.',
  '욕설/생명경시/혐오/차별적 표현입니다.', '개인정보 노출 게시물입니다.', '불쾌한 표현이 있습니다.', '명예훼손 또는 저작권 침해되었습니다.'
];

type ReportRouteParams = {
  type: 'post' | 'comment' | 'chat_message' | 'chat_room' | 'sharing' | 'sharing_log';
  postId?: number;
  commentId?: number;
  chatMessageId?: number;
  chatRoomId?: number;
  sharingId?: number;
  sharingLogId?: number;
};

export default function ReportForm() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [reportContent, setReportContent] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const {user, setUser} = useUser();
  const reasonCode = categories.indexOf(selectedCategory ?? '');
  const route = useRoute<RouteProp<Record<string, ReportRouteParams>, string>>();
  const navigation = useNavigation();
  const {showModal, hideModal} = useModal();
  

  const idMap: Record<string, number | undefined> = {
  post: route.params.postId,
  comment: route.params.commentId,
  chat_message: route.params.chatMessageId,
  chat_room: route.params.chatRoomId,
  sharing: route.params.sharingId,
  sharing_log: route.params.sharingLogId,
};


  const { type, postId, commentId, chatMessageId, chatRoomId, sharingId, sharingLogId } = route.params;
  
  const targetId = type === 'post' ? postId : commentId;

  console.log('신고 타입:', type);
  console.log('신고 대상 ID:', targetId);

  const submitButton = async() => {

  if (reasonCode === -1) {
    // 카테고리가 선택되지 않은 경우 처리
    showModal({
      type: 'confirm',
      content: '신고 카테고리를 선택해주세요.',
    });
    return; // 함수 종료해서 아래 API 호출 안 함
  }

    try{
        const data = {
          reporterId: user?.userId,
          targetType: type,  // 백엔드 enum에 맞게 소문자, 언더바로 맞춤
          targetId: targetId,
          reasonCode: categories.indexOf(selectedCategory ?? ''),
        details: reportContent,
        };
      const res = await api.post('report/submit', data);
      showModal({
                type:'confirm',
                content : '신고처리가 완료되었습니다.',
                onConfirm: () => navigation.goBack()
            })  
    }catch(error:any){
      const message =
            error.response?.data?.message ||
            error.message
            '알 수 없는 오류가 발생했습니다.';
            showModal({
                type:'confirm',
                content : message,
            })  
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>신고 글 작성</Text>

      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {selectedCategory ?? '신고 카테고리'}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      <Modal visible={isDropdownVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setDropdownVisible(false)}
        >
          <View style={styles.dropdownMenu}>
            {categories.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCategory(item);
                  setDropdownVisible(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>

      <TextInput
        style={styles.textArea}
        multiline
        placeholder="신고 내용을 입력해주세요."
        value={reportContent}
        onChangeText={setReportContent}
      />

      <TouchableOpacity style={styles.submitButton} onPress={submitButton}>
        <Text style={styles.submitText}>신고</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: wp('4.5%'),
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: hp('3%'),
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('2%'),
  },
  dropdownText: {
    fontSize: wp('3.8%'),
    color: '#333',
  },
  dropdownIcon: {
    fontSize: wp('5%'),
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: wp('10%'),
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 4,
    paddingVertical: hp('1%'),
  },
  dropdownItem: {
    paddingVertical: hp('3%'),
    paddingHorizontal: wp('4%'),
  },
  dropdownItemText: {
    fontSize: wp('4%'), 
    color: '#333',
    fontWeight : 'bold'
} ,
  textArea: {
    height: hp('25%'),
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
    padding: wp('4%'),
    borderRadius: 4,
    marginBottom: hp('4%'),
    fontSize: wp('3.8%'),
  },
  submitButton: {
    backgroundColor: '#d4f88a',
    paddingVertical: hp('2.2%'),
    borderRadius: 8,
    alignItems: 'center',
  },
  submitText: {
    fontWeight: 'bold',
    fontSize: wp('4%'),
    color: '#000',
  },
});
