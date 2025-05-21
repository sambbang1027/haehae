import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CommuntiyStackParamList } from '../navigation/CommunityNavigator';


type OptionModalProps = {
  isAuthor: boolean;
  postId: number;
};

const OptionModal = forwardRef((props: OptionModalProps, ref) => {
  const { isAuthor, postId } = props;
  const modalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<NativeStackNavigationProp<CommuntiyStackParamList>>();

  // 동적으로 snapPoints 설정
  const snapPoints = isAuthor ? ['24%'] : ['13%'];

  useImperativeHandle(ref, () => ({
    present: () => modalRef.current?.present(),
    close: () => modalRef.current?.close(),
  }));

  useEffect(() => {
  }, []);

  const handleReport = () => {
    modalRef.current?.close();
    navigation.navigate('ReportScreen', { type: 'post', postId });
  };

  const handleEdit = () => {
    modalRef.current?.close();
  };

  const handleDelete = () => {
    modalRef.current?.close();
  };

  return (
    <BottomSheetModal
      ref={modalRef}
      snapPoints={snapPoints}
      index={0}
      backgroundStyle={{ backgroundColor: 'white' }}
      style={styles.modalContainer}
    >
      <View style={styles.container}>
        {isAuthor ? (
          <>
            <TouchableOpacity onPress={handleEdit}>
              <Text style={styles.option}>수정</Text>
            </TouchableOpacity>
            <View style={styles.divider} />
            <TouchableOpacity onPress={handleDelete}>
              <Text style={[styles.option, styles.delete]}>삭제</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity onPress={handleReport}>
            <Text style={[styles.option, styles.delete]}>신고</Text>
          </TouchableOpacity>
        )}
      </View>
    </BottomSheetModal>
  );
});

export default OptionModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  modalContainer: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5, // Android 그림자
    borderTopWidth: 2,
    borderColor: '#ddd',
    zIndex: 9999,
  },
  option: {
    fontSize: 18,
    textAlign: 'center',
    paddingVertical: 12,
  },
  delete: {
    color: 'red',
    fontWeight: 'bold',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginVertical: 8,
  },
});
