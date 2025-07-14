// src/main/java/com/example/backend/collectionspots/CollectionSpotController.java
package com.example.backend.collectionspots;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/collectionspot")
@RequiredArgsConstructor
public class CollectionSpotController {
    private final CollectionSpotService service;

    @GetMapping
    public ResponseEntity<List<CollectionSpotDto>> getSpots(
            @RequestParam(required = false) String wasteItem,
            @RequestParam(required = false) String regionCode) {

        System.out.println("=================================================== 진입점");

        List<CollectionSpot> list;

        if (wasteItem == null || wasteItem.isBlank()) {
            // 전체 조회
            if (regionCode == null || regionCode.isBlank()) {
                list = service.findAll();
            } else {
                list = service.findByRegionCode(regionCode);
            }
        } else {
            // 특정 wasteItem에 대한 조회
            if (regionCode == null || regionCode.isBlank()) {
                list = service.findByWasteItem(wasteItem);
            } else {
                list = service.findByWasteItemAndRegionCode(wasteItem, regionCode);
            }
        }

        List<CollectionSpotDto> result = list.stream()
                .map(spot -> new CollectionSpotDto(
                        spot.getCollectionsSpotId(),
                        spot.getWasteItem(),
                        spot.getLotAddress(),
                        spot.getRoadAddress(),
                        spot.getDescription(),
                        spot.getAvailableTime(),
                        spot.getSpotType(),
                        spot.getLatitude(),
                        spot.getLongitude(),
                        spot.getRegionCode()
                ))
                .collect(Collectors.toList());

        System.out.println("데이터 한번 찍어보기" + result);

        return ResponseEntity.ok(result);
    }
}