package com.example.backend.collectionspots;

import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class CollectionSpotMapper {

    public CollectionSpotDto toDto(CollectionSpot spot) {
        return new CollectionSpotDto(
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
        );
    }

    public List<CollectionSpotDto> toDtoList(List<CollectionSpot> spots) {
        return spots.stream().map(this::toDto).collect(Collectors.toList());
    }
}
