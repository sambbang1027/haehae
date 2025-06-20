import React from 'react';
import { useNavigationState } from '@react-navigation/native';
import AppNavigator from '../../navigation/AppNavigator';
import Footer from './Footer';
import { useEffect } from 'react';

/**
 * 가장 깊숙한 현재 화면(Route)의 name을 재귀적으로 추출
 */
const getDeepestRouteName = (navState: any): string | undefined => {
  if (!navState || !navState.routes || typeof navState.index !== 'number') return undefined;

  const current = navState.routes[navState.index];

  //만약 current.state가 없고, current.params.screen이 있다면 그걸 반환
  if (!current.state && current.params?.screen) {
    return current.params.screen;
  }

  if (current?.state) {
    return getDeepestRouteName(current.state);
  }

  return current?.name;
};

export default function FooterLayout() {
  const state = useNavigationState((state) => state);
  const currentRoute = getDeepestRouteName(state);
  useEffect(() => {
  //console.log('전체 navigation state:', JSON.stringify(state, null, 2));
}, [state]);

 // console.log('현재 라우트:', currentRoute); // 디버깅 로그

  const hideFooterRoutes = [
    'LocalBoardDetail',
    'LocalBoardReply',
    'WriteLocalPost',
    'SharingDetail',
    'WriteSharingPost',
    'VolunteerDetail',
    'ChatingDetail',
    'RewardDetail',
    'ReportScreen'
  ];

  const showFooter = !hideFooterRoutes.includes(currentRoute ?? '');

  return (
    <>
      {showFooter && <Footer />}
    </>
  );
}
