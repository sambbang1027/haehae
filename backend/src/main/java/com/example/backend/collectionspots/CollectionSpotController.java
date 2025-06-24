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
            @RequestParam String wasteItem,
            @RequestParam(required = false) String regionCode) {

        List<CollectionSpot> list;
        if (regionCode == null || regionCode.isBlank()) {
            list = service.findByWasteItem(wasteItem);
        } else {
            list = service.findByWasteItemAndRegionCode(wasteItem, regionCode);
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

        return ResponseEntity.ok(result);
    }
}