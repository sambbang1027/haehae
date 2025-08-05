package com.example.backend.collectionspots;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class CollectionSpotDto {
    private Long id;
    private String wasteItem;
    private String lotAddress;
    private String roadAddress;
    private String description;
    private String availableTime;
    private String spotType;      // 노출 필요 시
    private BigDecimal latitude;
    private BigDecimal longitude;
    private String regionCode;

    public static CollectionSpotDto from(CollectionSpot entity) {
        return new CollectionSpotDto(
                entity.getCollectionsSpotId(),
                entity.getWasteItem(),
                entity.getLotAddress(),
                entity.getRoadAddress(),
                entity.getDescription(),
                entity.getAvailableTime(),
                entity.getSpotType(),
                entity.getLatitude(),
                entity.getLongitude(),
                entity.getRegionCode()
        );
    }
}
