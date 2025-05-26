import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type TextSize = 'small' | 'medium' | 'large';

const TextSizeContext = createContext<{
  size: TextSize;
  setSize: (size: TextSize) => void;
}>({
  size: 'medium',
  setSize: () => {},
});

export const TextSizeProvider = ({ children }: { children: React.ReactNode }) => {
  const [size, setSizeState] = useState<TextSize>('medium');

  // 저장 + 상태 변경 함께
  const setSize = async (newSize: TextSize) => {
    setSizeState(newSize);
    await AsyncStorage.setItem('textSize', newSize);
  };

  // 초기 로드 시 AsyncStorage에서 복구
  useEffect(() => {
    const load = async () => {
      const saved = await AsyncStorage.getItem('textSize');
      if (saved === 'small' || saved === 'medium' || saved === 'large') {
        setSizeState(saved);
      }
    };
    load();
  }, []);

  return (
    <TextSizeContext.Provider value={{ size, setSize }}>
      {children}
    </TextSizeContext.Provider>
  );
};

export const useTextSize = () => useContext(TextSizeContext);
