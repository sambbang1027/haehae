package com.example.backend.collectionspots;

import com.example.backend.exception.ErrorCode;
import com.example.backend.exception.HaehaeException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.math.BigDecimal;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class CollectionSpotService { 

    private final CollectionSpotRepository collectionSpotRepository;
    private final GeocodingService geocodingService;

    public List<CollectionSpot> findByWasteItem(String wasteItem) {
        return collectionSpotRepository.findByWasteItem(wasteItem);
    }

    public List<CollectionSpot> findByWasteItemAndRegionCode(String wasteItem, String regionCode) {
        return collectionSpotRepository.findByWasteItemAndRegionCode(wasteItem, regionCode);
    }

    public List<CollectionSpot> findAll() {
        return collectionSpotRepository.findAll();
    }

    public List<CollectionSpot> findByRegionCode(String regionCode) {
        return collectionSpotRepository.findByRegionCode(regionCode);
    }

    // 결과 찍으려고 넣은 값.
    int updatedCount = 0;

    // 한번에 주소 -> 위도, 경도, 행정동 코드 채워넣기
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

}