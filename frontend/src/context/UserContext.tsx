import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/AxiosInstance';
import EncryptedStorage from 'react-native-encrypted-storage';

type User = {
  userId: number;
  email: string;
  nickname: string;
  role: string;
  profileImage: string;
};

type UserContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => Promise<void>;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  login: () => {},
  logout: async () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 앱 시작 시 자동 로그인
  useEffect(() => {
    const tryAutoLogin = async () => {
        console.log('📲 앱 시작됨: 자동 로그인 시도');
      const autoLogin = await EncryptedStorage.getItem('autoLogin');
        console.log('🔒 autoLogin 상태:', autoLogin);

      if (autoLogin === 'true') {
        const token = await EncryptedStorage.getItem('accessToken');
              console.log('📦 저장된 토큰:', token);

        if (token) {
          try {
            const res = await api.get('/auth/validate', {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUser(res.data.data);
            setIsAuthenticated(true);
          } catch (err) {
            console.log('자동 로그인 실패:', err);
            await EncryptedStorage.clear();
            setUser(null);
            setIsAuthenticated(false);
          }
        }
      }
    };

    tryAutoLogin();
  }, []);

  // 로그인 처리 (토큰 저장은 외부에서)
  const login = (user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  };

  // 로그아웃
  const logout = async () => {
    setUser(null);
    setIsAuthenticated(false);
    await EncryptedStorage.clear();
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
