import React from 'react';
import { NavigationContainerRefWithCurrent } from '@react-navigation/native';
import AppNavigator, { AppStackParamList } from '../../navigation/AppNavigator';
import Footer from './Footer';
import { useEffect, useState } from 'react';


type Props = {
  navigationRef: NavigationContainerRefWithCurrent<AppStackParamList> | null;
};

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

export default function FooterLayout({ navigationRef }: Props) {
  const [currentRoute, setCurrentRoute] = useState<string | undefined>(undefined);

  // 현재 라우트 감지
  useEffect(() => {
  if (!navigationRef?.getCurrentRoute) return;

  const updateRoute = () => {
    const route = navigationRef.getCurrentRoute();
    setCurrentRoute(route?.name);
  };

  const unsubscribe = navigationRef.addListener?.('state', updateRoute);
  updateRoute();

  return () => {
    unsubscribe?.();
    };
  }, [navigationRef]);

  const showFooter = !hideFooterRoutes.includes(currentRoute ?? '');

  return <>{showFooter && <Footer />}</>;
}