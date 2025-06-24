// 현재 내 위치 조회

import { useState, useEffect } from 'react';
import { PermissionsAndroid, Alert } from 'react-native';
import Geolocation, {  GeoPosition,} from 'react-native-geolocation-service';

export interface Location {
  latitude: number;
  longitude: number;
}

// 현재 내위치(위도, 경도)를 가져오는 커스텀 훅
// 안드로이드 런타임 권한 요청
// 위치 조회 성공 or 실패 처리

export function useCurrentLocation() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading]   = useState<boolean>(true);
  const [error, setError]       = useState<string | null>(null);

  // Android 위치 권한 요청
  async function requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: '위치 권한 요청',
          message: '현재 위치를 표시하기 위해 위치 권한이 필요합니다.',
          buttonNeutral: '나중에',
          buttonNegative: '거부',
          buttonPositive: '허용',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err: any) {
      console.warn(err);
      return false;
    }
  }

  useEffect(() => {
    (async () => {
      const hasPerm = await requestLocationPermission();
      if (!hasPerm) {
        Alert.alert(
          '위치 권한 거부됨',
          '위치 권한이 허용되어야 내 위치를 가져올 수 있습니다.',
        );
        setError('권한 거부');
        setLoading(false);
        return;
      }

      Geolocation.getCurrentPosition(
        (pos: GeoPosition) => {
          setLocation({
            latitude:  pos.coords.latitude,
            longitude: pos.coords.longitude,
          });
          setLoading(false);
        },
        (err) => {
          console.error('위치 조회 실패:', err);
          Alert.alert('위치 정보를 가져올 수 없습니다.', err.message);
          setError(err.message);
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 10000,
        },
      );
    })();
  }, []);

  return { location, loading, error };
}