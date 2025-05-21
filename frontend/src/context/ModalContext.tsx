import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ImageSourcePropType } from 'react-native';

export type ModalType = 'default' | 'alert' | 'confirm' |'bottom';

export type ModalOptions = {
  type: ModalType;
  img?: ImageSourcePropType;
  content?: string | ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
};

type ModalState = ModalOptions & {
  visible: boolean;
};

const initialState: ModalState = {
  visible: false,
  type: 'default',
  content: null,
};

const ModalContext = createContext<{
  modal: ModalState;
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}>({
  modal: initialState,
  showModal: () => {},
  hideModal: () => {},
});

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<ModalState>(initialState);

  const showModal = (options: ModalOptions) => {
    setModal({ ...options, visible: true });
  };

  const hideModal = () => {
    setModal(initialState);
  };

  return (
    <ModalContext.Provider value={{ modal, showModal, hideModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};
