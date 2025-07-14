import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Config from 'react-native-config';
import { useCurrentLocation, Location } from '../../utils/useCurrentLocation';
import api from '../../api/AxiosInstance';

type KakaoDoc = { place_name: string; x: string; y: string; };
interface LocationItem { label: string; lat: number; lng: number; regionCode: string; }


// Kakao REST API 검색 함수
async function fetchKakaoKeyword(query: string): Promise<KakaoDoc[]> {
  const res = await fetch(
    `https://dapi.kakao.com/v2/local/search/keyword.json?query=${encodeURIComponent(query)}`,
    { headers: { Authorization: `KakaoAK ${Config.KAKAO_REST_KEY}` } }
  );
  if (!res.ok) throw new Error(`Kakao API error ${res.status}`);
  const json = await res.json();
  return json.documents as KakaoDoc[];
}

const CollectionBoxLocationScreen: React.FC = () => {
  const { location, loading: locLoading, error: locError } = useCurrentLocation();
  const [spots, setSpots] = useState<LocationItem[]>([]);
  const webviewRef = useRef<WebView>(null);
  const [keyword, setKeyword] = useState('');

  // 추가된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '재활용정거장', '폐형광등', '폐건전지'];

  // 백엔드 수거함 불러오기
  useEffect(() => {

    console.log('🗺 spots state:', spots);

    console.log('📍 useCurrentLocation location:', location);

    if (locLoading || locError || !location) return;
    (async () => {
      try {
        //const res = await fetch(`http://localhost:8082/api/collectionspot?wasteItem=재활용정거장`);
        //const res = await fetch(`http://localhost:8082/api/collectionspot?wasteItem=재활용정거장`);
        //const res = api.get(`/collectionspot?wasteItem=재활용정거장`);

        let query = selectedCategory === '전체' ? '' : `?wasteItem=${encodeURIComponent(selectedCategory)}`;

        //const res = api.get(`/collectionspot?wasteItem=${encodeURIComponent(selectedCategory)}`);

        const res = await api.get(`/collectionspot${query}`);

        console.log("🛰 요청 보냄");
        
        const data: any[] = res.data;
        
        console.log('🔥 백엔드에서 받은 raw data:', data);

        // 배열인지 확인 후 setSpots
        if (Array.isArray(data)) {
          setSpots(data.map(d => ({
            label: d.description ?? d.wasteItem,
            lat: d.latitude,
            lng: d.longitude,
            regionCode: d.regionCode,
          })));
        } else {
          console.warn('❗️백엔드 응답이 배열이 아님:', data);
          Alert.alert('서버에서 받은 데이터 형식이 잘못되었습니다.');
        }

      } catch (e) {
        console.error(e);
        console.log("데이터 에러 : ", e)
        Alert.alert('수거함 데이터를 가져오는 중 오류가 발생했습니다.');
      }
    })();
  }, [locLoading, locError, location, selectedCategory]); // 선택된 카테고리 변경 시 재요청

  if (locLoading) return <View style={styles.center}><ActivityIndicator size="large"/></View>;
  if (locError || !location) return <View style={styles.center}><Text>위치 정보를 사용할 수 없습니다.</Text></View>;

  // 에뮬레이터 임시 좌표 지정
  const defaultLat = 37.4765;
  const defaultLng = 126.9816;

  const { latitude: baseLat, longitude: baseLng } = location ?? {latitude: defaultLat, longitude: defaultLng};

  //const { latitude: baseLat, longitude: baseLng } = location as Location;

  // 초기 positions JSON
  const initPositions = [
    { title: '내 위치', lat: baseLat, lng: baseLng },
    ...spots.map(s => ({ title: s.label, lat: s.lat, lng: s.lng }))
  ];
  const positionsJson = JSON.stringify(initPositions);

  // HTML 템플릿
  const kakaoHtml = `
<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>지도</title>
<style>html,body,#map{width:100%;height:100%;margin:0;padding:0;}</style>
<script src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=${Config.KAKAO_JS_KEY}&libraries=services"></script>
</head><body>
  <div id="map"></div>
  <script>
    var positions = ${positionsJson};
    var map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(positions[0].lat, positions[0].lng),
      level: 4
    });
    var zoomCtrl = new kakao.maps.ZoomControl();
    map.addControl(zoomCtrl, kakao.maps.ControlPosition.RIGHT);


    window._searchMarkers = [];
    positions.forEach(function(pos) {
      var m = new kakao.maps.Marker({
        map: map,
        position: new kakao.maps.LatLng(pos.lat, pos.lng),
        title: pos.title
      });
      window._searchMarkers.push(m);
    });

    window.moveToLocation = function(lat, lng) {
      map.panTo(new kakao.maps.LatLng(lat, lng));
    };

    window.handleSearchResults = function(docs) {
      console.log('[WebView] handleSearchResults 호출, docs length =', docs.length, docs);
      // 기존 마커 제거
      window._searchMarkers.forEach(m => m.setMap(null));
      window._searchMarkers = [];
      var bounds = new kakao.maps.LatLngBounds();
      docs.forEach(function(d) {
        var lat = parseFloat(d.y), lng = parseFloat(d.x);
        var m = new kakao.maps.Marker({
          map: map,
          position: new kakao.maps.LatLng(lat, lng),
          title: d.place_name
        });
        window._searchMarkers.push(m);
        bounds.extend(m.getPosition());
      });
      if (docs.length) {
        console.log('[WebView] map.setBounds to', bounds);
        map.setBounds(bounds);
      }
    };

    window.moveToLocation = function(lat, lng) {
      map.panTo(new kakao.maps.LatLng(lat, lng));
    };

    console.log('[WebView] initialized');
  </script>
</body></html>
`;

  return (
    <View style={styles.container}>
      {/* A. 검색창 */}

      <View style={styles.topBar}>
      <View style={styles.searchBox}>
        <TextInput
          style={styles.searchInput}
          placeholder="장소 검색"
          placeholderTextColor="#888"
          value={keyword}
          onChangeText={setKeyword}
        />
        <Button
          title="검색"
          onPress={async () => {
            console.log('▶️ [RN] 검색 버튼 눌림, keyword =', keyword);
            try {
              // 실제 기기에서는 host IP를 써야 합니다
              const docs = await fetchKakaoKeyword(keyword);
              console.log('▶️ [RN] fetchKakaoKeyword 반환 docs =', docs);
              // WebView로 결과 전달
              const js = `window.handleSearchResults(${JSON.stringify(docs)}); true;`;
              console.log('▶️ [RN] injectJavaScript:', js);
              webviewRef.current?.injectJavaScript(js);
            } catch (err) {
              console.error('❌ [RN] 검색 중 에러:', err);
              Alert.alert('검색 중 오류가 발생했습니다.');
            }
          }}
        />
      </View>

      {/* B. 카테고리 버튼 영역 */}
      <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          {categories.map((cat, idx) => (
            <TouchableOpacity
              key={idx}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => {
                setSelectedCategory(cat);
                // 여기서 버튼 클릭 시 기능 연결(예: 해당 카테고리만 리스트 필터링) 가능,
                // 현재 기능은 건드리지 않으므로 UI 상 표시만 합니다.
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* B. 내 위치 */}
      <View style={styles.locationBox}>
        <Text style={styles.locationText}>
          내 위치: [{baseLat.toFixed(5)}, {baseLng.toFixed(5)}]
        </Text>
      </View>

      {/* C. 지도 (고정 높이) */}
      <View style={styles.mapContainer}>
        <WebView
          ref={webviewRef}
          originWhitelist={['*']}
          source={{ html: kakaoHtml, baseUrl: 'https://localhost' }}
          javaScriptEnabled
          domStorageEnabled
          allowFileAccess // 추가 
          allowUniversalAccessFromFileURLs // 추가
          allowFileAccessFromFileURLs // 추가
          mixedContentMode="always"
          onError={e => console.log('WV error', e.nativeEvent)} // 추가
          onHttpError={e => console.log('WV http-error', e.nativeEvent)} // 추가
        />
      </View>

      {/* D. 리스트 (스크롤) */}
      <ScrollView style={styles.listContainer}>
        {spots.map((s, i) => (
          <TouchableOpacity
            key={i}
            style={styles.itemRow}
            onPress={() => {
              const js = `window.moveToLocation(${s.lat}, ${s.lng}); true;`;
              webviewRef.current?.injectJavaScript(js);
            }}
          >
            <Text style={styles.itemText}>• {s.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default CollectionBoxLocationScreen;

const styles = StyleSheet.create({
  container:    { flex:1, backgroundColor:'#fff' },
  //searchBox:    { flexDirection:'row', padding: wp('4%') },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },

  //searchInput:  { flex:1, borderWidth:1, borderColor:'#ccc', borderRadius:4, padding:8, marginRight:8, color: '#000' },

  searchInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginRight: 8,
    color: '#000',
  },

  categoryContainer: {
    // 버튼 간 간격 조절을 위해 padding 추가
    paddingVertical: hp('0.5%'),
  },

  categoryButton: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.8%'),
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: wp('2%'),
  },

  categoryButtonActive: {
    backgroundColor: '#4a90e2',
  },
  categoryText: {
    fontSize: wp('4%'),
    color: '#000',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },

  locationBox:  { paddingHorizontal: wp('4%'), paddingBottom: hp('1%') },
  locationText: { fontSize: wp('4%'), color:'#000' },

  topBar: {
  paddingHorizontal: wp('4%'),
  paddingTop: hp('2%'),
  paddingBottom: hp('1%'),
  backgroundColor: '#fff',
  },

  // D. 지도 고정 높이
  mapContainer: {
    height: hp('35%'),
    marginHorizontal: wp('6%'),
    marginBottom: hp('2%'),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: wp('2%'),
    overflow: 'hidden',
  },

  // 리스트
  listContainer:{ 
    flex:1, 
    marginHorizontal: wp('6%'),
    marginBottom: hp('2%'), 
  },


  itemRow:      { paddingVertical: hp('1%'), borderBottomWidth:1, borderColor:'#eee' },
  itemText:     { fontSize: wp('4%'), color:'#000' },
  
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
