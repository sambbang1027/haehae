// src/main/java/com/example/backend/collectionspots/CollectionSpotController.java
package com.example.backend.collectionspots;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/collectionspot")
@RequiredArgsConstructor
public class CollectionSpotController {

    private final CollectionSpotService service;
    private final CollectionSpotMapper mapper;

    // regionCode 코드 기반 OR 전체 조회 (추후 관리자 페이지용)
    @GetMapping
    public ResponseEntity<List<CollectionSpotDto>> getSpots(
            @RequestParam(required = false) String wasteItem,
            @RequestParam(required = false) String regionCode) {

        List<CollectionSpot> spots = service.findByOptionalWasteItemAndRegion(wasteItem, regionCode);
        return ResponseEntity.ok(mapper.toDtoList(spots));
    }

    // 내 위치 기준 가까운 수거함 조회
    @GetMapping("/nearby")
    public ResponseEntity<List<CollectionSpotDto>> getNearbySpots(
            @RequestParam(required = false) String wasteItem, // 폐기물 종류
            @RequestParam double lat,
            @RequestParam double lng,
            @RequestParam(defaultValue = "1000") int radiusMeters
    ) {
        log.info("📡 GET /nearby - item={}, lat={}, lng={}, radiusMeters={}", wasteItem, lat, lng, radiusMeters);

        List<CollectionSpotDto> spots = service.getBoundingBoxSortedSpots(wasteItem, lat, lng, radiusMeters, 10);;

        return ResponseEntity.ok(spots);
    }
}