package com.example.backend.collectionspots;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import com.example.backend.geocoding.GeocodingService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.backend.geocoding.GeocodingResult;



import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CollectionSpotService { 

    private final CollectionSpotRepository collectionSpotRepository;
    private final GeocodingService geocodingService;

    // 결과 찍으려고 넣은 값.
    int updatedCount = 0;

    // 수거함에 regionCode, lat, lng 채워넣는 배치 처리 메서드
    @Transactional
    public void geocodeAndUpdateAllSpots() {
        List<CollectionSpot> list = collectionSpotRepository.findAll();

        System.out.println("서비스 찍히냐?? ===== " + list);

        // 행정동 코드에 한글 포함 또는 위도, 경도 없는 경우 필터링
        List<CollectionSpot> filtered = list.stream()
                .filter(spot -> spot.getLatitude() == null
                        || spot.getRegionCode() == null
                        || spot.getRegionCode().matches(".*[가-힣]+.*"))
                .toList();

        log.info("▶️ geocodeAndUpdateAllSpots: 처리 대상 스팟 개수 = {}", list.size());

        for (CollectionSpot spot : filtered) {
            // 도로명 주소만 검색
            String addr = spot.getRoadAddress();

            // 주소 검색
            geocodingService.geocode(addr).ifPresentOrElse(data -> {
                // 결과가 있다면 엔티티에 넣기
                spot.updateGeocode(
                        BigDecimal.valueOf(data.lat()),
                        BigDecimal.valueOf(data.lng()),
                        data.regionCode()
                );
                updatedCount++;

                log.info(
                        "   • #{} '{}' → lat={}, lng={}, code={}",
                        spot.getCollectionsSpotId(),
                        addr,
                        data.lat(), data.lng(), data.regionCode()
                );
            }, () -> {
                // 검색 결과 실패 -> 예외 던지기
                //throw new HaehaeException(ErrorCode.GEOCODING_FAILED);
                log.warn("❌ '{}' 주소에 대한 지오코딩 결과가 없습니다.", addr);

            });

            log.info("🔍 필터링 대상 spot ID = {}, regionCode = {}", spot.getCollectionsSpotId(), spot.getRegionCode());

        }
        log.info("✅ geocodeAndUpdateAllSpots: 최종 업데이트된 스팟 개수 = {}", updatedCount);
    }

//    // 현재 위치 기준 반경 내 수거함 조회 (QueryDSL)
//    public List<CollectionSpotDto> getNearby(String wasteItem, double lat, double lng, int radiusMeters) {
//
//        log.info("📍 반경 내 수거함 검색 로직 진입 ({}m)", radiusMeters);
//
//        return collectionSpotRepository.findNearbySpots(wasteItem, lat, lng, radiusMeters)
//                .stream()
//                .map(CollectionSpotDto::from)
//                .toList();
//    }

    public List<CollectionSpot> findByOptionalWasteItemAndRegion(String wasteItem, String regionCode) {

        if (wasteItem == null || wasteItem.isBlank()) {
            return collectionSpotRepository.findByRegionCode(regionCode);
        } else {
            return collectionSpotRepository.findByWasteItemAndRegionCode(wasteItem, regionCode);
        }
    }

    // 내 위치 기준 거리순 정렬 (Bounding Box 후보군 → 거리 정렬)
    public List<CollectionSpotDto> getBoundingBoxSortedSpots(String wasteItem, double lat, double lng, int radiusMeters, int limit) {

        // ✅ 빈 문자열이면 null로 치환 (쿼리 조건 통과용)
        String item = (wasteItem == null || wasteItem.isBlank()) ? null : wasteItem;

        double latDelta = radiusMeters / 111000.0;
        double lngDelta = radiusMeters / (111320.0 * Math.cos(Math.toRadians(lat)));

        double minLat = lat - latDelta;
        double maxLat = lat + latDelta;
        double minLng = lng - lngDelta;
        double maxLng = lng + lngDelta;

        // 1차 바운딩 박스 내 거리순
        List<CollectionSpot> spots = collectionSpotRepository.findSpotsInBoundingBoxSortedByDistance(
                item, lat, lng, minLat, maxLat, minLng, maxLng, limit
        );

        // 2차
        if (spots.isEmpty()) {
            log.warn("⚠️ 바운딩 박스 내 수거함 없음 → fallback 전체 거리순 정렬");
            spots = collectionSpotRepository.findClosestSpotsByDistance(item, lat, lng, limit);

            log.warn("바운딩 박스 내 수거함 없는 결과 리스트 : {}", spots);
        }

        return spots.stream().map(CollectionSpotDto::from).toList();
    }

}