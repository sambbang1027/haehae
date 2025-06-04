// CollectionBoxLocationScreen.tsx

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  PermissionsAndroid, // Android 런타임 권한 요청에 사용
  Alert,             // 알림창 띄우기에 사용
  ActivityIndicator, // 로딩 스피너 표시용
} from 'react-native';
import Geolocation from 'react-native-geolocation-service'; // GPS 위치 정보 가져오는 모듈
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'; // 반응형 화면 비율 사용
import { WebView } from 'react-native-webview';              // 웹뷰를 통한 카카오맵 렌더링
import Config from 'react-native-config';                    // 환경변수(API 키) 관리

/********************
 * Android의 위치 권한을 런타임에 요청하는 함수
 * - PermissionsAndroid.request를 사용해 ACCESS_FINE_LOCATION 권한을 요청
 * - 사용자가 허용하면 true, 아니면 false 반환
 ********************/
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
  } catch (err) {
    console.warn(err);
    return false;
  }
}

// 수거함 데이터 타입 정의: label(이름), lat(위도), lng(경도)
type LocationItem = {
  label: string;
  lat: number;
  lng: number;
};

// 예제용으로 하드코딩된 수거함 위치 목록 (서울 강남권 중심)
const staticLocations: LocationItem[] = [
  { label: '강남역 수거함', lat: 37.4979, lng: 127.0276 },
  { label: '코엑스 수거함',   lat: 37.5121, lng: 127.0652 },
  { label: '선릉역 수거함',   lat: 37.5044, lng: 127.0494 },
];

const CollectionBoxLocationScreen = () => {
  // 1) 현재 사용자의 위도(latitude) 상태
  const [currentLat, setCurrentLat] = useState<number | null>(null);
  // 2) 현재 사용자의 경도(longitude) 상태
  const [currentLng, setCurrentLng] = useState<number | null>(null);
  // 3) 위치 정보를 불러오는 동안 로딩 여부 표시
  const [locationLoading, setLocationLoading] = useState<boolean>(true);

  useEffect(() => {
    (async () => {
      // 4) Android 권한 요청 함수 호출
      const hasPermission = await requestLocationPermission();
      if (!hasPermission) {
        // 권한 거부 시 안내 알림을 띄우고 로딩 상태 해제
        Alert.alert(
          '위치 권한 거부됨',
          '위치 권한이 허용되어야 내 위치를 기반으로 지도를 표시할 수 있습니다.',
        );
        setLocationLoading(false);
        return;
      }

      // 5) 권한 허용된 경우, Geolocation.getCurrentPosition으로 현재 위치 조회
      Geolocation.getCurrentPosition(
        (position) => {
          // 성공: 위도/경도 상태 업데이트 후 로딩 해제
          setCurrentLat(position.coords.latitude);
          setCurrentLng(position.coords.longitude);
          setLocationLoading(false);
        },
        (error) => {
          // 실패: 콘솔에 에러 출력, 알림 띄우고 로딩 해제
          console.error('위치 조회 실패:', error);
          Alert.alert('위치 정보를 가져올 수 없습니다.', 'GPS 혹은 위치 권한 상태를 확인하세요.');
          setLocationLoading(false);
        },
        {
          enableHighAccuracy: true, // GPS 기반 고정밀도 허용
          timeout: 15000,           // 15초 내에 응답 없으면 에러 처리
          maximumAge: 10000,        // 캐시된 위치 최대 10초까지만 사용
        },
      );
    })();
  }, []);

  // 6) 위치 정보 로딩 중일 때는 로딩 스피너만 보여줌
  if (locationLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  // 7) 위치 조회에 실패하거나 currentLat/currentLng가 null인 경우
  //    기본값으로 “강남역(37.4979, 127.0276)” 좌표를 사용
  const baseLat = currentLat !== null ? currentLat : 37.4979;
  const baseLng = currentLng !== null ? currentLng : 127.0276;

  // 8) 내 위치를 맨 앞에 추가하고 staticLocations 배열을 이어붙여서
  //    JS용 좌표 객체 배열 리터럴 문자열을 생성
  const positionsForJs = [
    `{ title: "내 위치", lat: ${baseLat.toFixed(6)}, lng: ${baseLng.toFixed(6)} }`,
    ...staticLocations.map(
      (loc) => `{ title: "${loc.label}", lat: ${loc.lat}, lng: ${loc.lng} }`,
    ),
  ].join(',\n  ');

  /***************************************
   * 9) 카카오맵 웹 SDK를 이용한 HTML 템플릿
   * - ${positionsForJs} 부분에 위·경도 배열이 문자열로 삽입됨
   * - 첫 번째 요소(내 위치)를 지도 중심으로 설정
   * - staticLocations 배열에 있는 수거함 위치에 마커를 찍음
   ***************************************/
  const kakaoHtml = `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8"/>
      <title>내 위치 기반 수거함</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
      <style>
        /* html, body, #map 모두 화면 전체를 차지하도록 설정 */
        html, body {
          width:100%;
          height:100%;
          margin:0; padding:0; overflow:hidden;
        }
        #map { width:100%; height:100%; }
      </style>
      <!-- 카카오맵 웹 SDK 스크립트 로드 (Config.KAKAO_JS_KEY 에 사용자 발급 키를 넣어야 함) -->
      <script
        src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${Config.KAKAO_JS_KEY}&libraries=services"
      ></script>
    </head>
    <body>
      <!-- 지도가 그려질 영역(id="map") -->
      <div id="map"></div>
      <script>
        // ① React Native로부터 전달된 위치 정보(내 위치 + staticLocations) 배열
        var positions = [
          ${positionsForJs}
        ];

        // ② 지도 초기화: 첫 번째 요소(내 위치)를 지도 중심으로 사용
        var container = document.getElementById('map');
        var options = {
          center: new kakao.maps.LatLng(positions[0].lat, positions[0].lng),
          level: 4,         // 확대 레벨 (1이 최대, 숫자 클수록 더 멀리서 봄)
          draggable: true,  // 드래그(드래그 앤 드롭) 허용
          zoomable: true    // 핀치 줌/스크롤 줌 허용
        };
        var map = new kakao.maps.Map(container, options);

        // ③ 우측에 확대/축소 컨트롤 추가
        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        // ④ positions 배열을 순회하면서 마커 및 InfoWindow 추가
        positions.forEach(function(pos, idx) {
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(pos.lat, pos.lng),
            title: pos.title
          });

          var iwContent = '<div style="padding:5px; font-size:14px;">' + pos.title + '</div>';
          var infowindow = new kakao.maps.InfoWindow({ content: iwContent });

          // 마커 클릭 시 InfoWindow 열기
          kakao.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map, marker);
          });
        });
      </script>
    </body>
  </html>
  `;

  return (
    <View style={styles.container}>
      {/* 10) 디버그용: 현재 내 위치(위도/경도)가 잘 찍혔는지 텍스트로 표시 */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>
          내 위치: [{baseLat.toFixed(5)}, {baseLng.toFixed(5)}]
        </Text>
      </View>

      {/* 11) 수거함 리스트(하드코딩된 staticLocations) */}
      <View style={styles.boxList}>
        {staticLocations.map((item, idx) => (
          <View key={idx} style={styles.itemRow}>
            <Text style={styles.itemText}>• {item.label}</Text>
          </View>
        ))}
      </View>

      {/* 12) WebView를 통해 카카오맵 웹 SDK가 그려진 HTML을 렌더링 */}
      <View style={styles.borderBox}>
        <WebView
          originWhitelist={['*']}
          source={{ html: kakaoHtml }}  // 위에서 만든 HTML 문자열을 넘겨줌
          javaScriptEnabled={true}       // WebView 내 자바스크립트 실행 허용
          domStorageEnabled={true}       // localStorage/sessionStorage 허용
          mixedContentMode="always"      // HTTP/HTTPS 혼합 콘텐츠 허용
          onLoad={() => console.log('WebView 로드 성공')}
          onError={(e) => console.error('WebView 로드 에러:', e.nativeEvent)}
          injectedJavaScript={`
            (function() {
              // 웹뷰 내부에서 console.log를 호출하면 React Native 쪽으로 메시지 전달
              window.console.log = function(message) {
                window.ReactNativeWebView.postMessage(message);
              };
            })();
          `}
          onMessage={(event) => console.log('WebView 메시지:', event.nativeEvent.data)}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: wp('2%'), // 모서리 둥글게
            overflow: 'hidden',     // 모서리 둥글게 보이도록
          }}
        />
      </View>
    </View>
  );
};

export default CollectionBoxLocationScreen;

// 스타일 정의
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: wp('6%'),
    paddingTop: hp('4%'),
  },
  locationBox: {
    // 현재 위치 텍스트를 감싸는 박스 스타일
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: wp('8%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  locationText: {
    // 현재 위치 텍스트 스타일
    fontSize: wp('4%'),
    fontWeight: '500',
    color: '#000',
  },
  boxList: {
    // 수거함 리스트 컨테이너
    marginBottom: hp('2%'),
  },
  itemRow: {
    // 각 수거함 항목 행 스타일
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: hp('1.5%'),
  },
  itemText: {
    // 수거함 항목 텍스트 스타일
    fontSize: wp('4%'),
    color: '#000',
    fontWeight: '300',
  },
  borderBox: {
    // WebView(카카오맵) 영역을 감싸는 스타일
    height: hp('45%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
});