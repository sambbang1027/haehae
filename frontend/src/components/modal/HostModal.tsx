import React from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useModal } from '../../context/ModalContext';
import DefaultModal from './DefaultModal';
import AlertModal from './AlertModal';
import ConfirmModal from './ConfirmModal';
import BottomSheetModal from './BottomModal';

const ModalHost = () => {
  const { modal, hideModal } = useModal();

  const renderModalContent = () => {
    switch (modal.type) {
      case 'alert':
        return <AlertModal 
        img={modal.img}
        content={modal.content} 
        onConfirm={hideModal} />;
      case 'confirm':
        return (
          <ConfirmModal
            img={modal.img}
            content={modal.content}
            onConfirm={() => {
              modal.onConfirm?.();
              hideModal();
            }}
            onCancel={() => {
              modal.onCancel?.();
              hideModal();
            }}
          />
        );
        case 'bottom' :
          return <BottomSheetModal>{modal.content}</BottomSheetModal>;
        case 'default' :
        return <DefaultModal>{modal.content}</DefaultModal>;
    }
  };

  return (
    <Modal visible={modal.visible} transparent animationType="fade" onRequestClose={hideModal}>
    {modal.type === 'bottom' ? (
    renderModalContent() // 모달 스타일 적용 없이 바로 렌더링
  ) : (
    <View style={styles.overlay}>
      <View style={styles.container}>{renderModalContent()}</View>
    </View>
  )}
</Modal>
  );
};

export default ModalHost;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
});
