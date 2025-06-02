// components/OptionModal.tsx
import React, {
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CommuntiyStackParamList } from '../navigation/CommunityNavigator';
import BottomModal from './modal/BottomModal';

type OptionModalProps = {
  isAuthor: boolean;
  postId: number;
};

export type OptionModalHandle = {
  present: () => void;
  close: () => void;
};

const OptionModal = forwardRef<OptionModalHandle, OptionModalProps>(({ isAuthor, postId }, ref) => {
  const navigation = useNavigation<NativeStackNavigationProp<CommuntiyStackParamList>>();
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    present: () => setVisible(true),
    close: () => setVisible(false),
  }));

  const handleReport = () => {
    setVisible(false);
    navigation.navigate('ReportScreen', { type: 'post', postId });
  };

  const handleEdit = () => {
    setVisible(false);
    // 수정 로직
  };

  const handleDelete = () => {
    setVisible(false);
    // 삭제 로직
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => setVisible(false)}
    >
      <BottomModal>
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
      </BottomModal>
    </Modal>
  );
});

export default OptionModal;

const styles = StyleSheet.create({
  container: {
    padding: 15,
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
