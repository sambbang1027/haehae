package com.example.backend.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "collections_spots")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class CollectionSpot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collections_spot_id", updatable = false, nullable = false)
    private Long collectionsSpotId;

    @Column(name = "source_id", nullable = false)
    private Integer sourceId;

    @Column(name = "waste_item", length = 50, nullable = false)
    private String wasteItem;

    @Column(name = "spot_type", length = 100)
    private String spotType;

    @Column(name = "lot_address", length = 200, nullable = false)
    private String lotAddress;

    @Column(name = "road_address", length = 200, nullable = false)
    private String roadAddress;

    @Column(name = "building_name", length = 200)
    private String buildingName;

    @Column(name = "quantity", nullable = false)
    private Integer quantity = 1;

    @Column(name = "description", length = 500)
    private String description;

    @Column(name = "available_time", length = 100)
    private String availableTime;

    @Column(name = "region_code", length = 20)
    private String regionCode;

    @Column(name = "latitude", precision = 10, scale = 7)
    private BigDecimal latitude;

    @Column(name = "longitude", precision = 10, scale = 7)
    private BigDecimal longitude;

    @Column(name = "data_date")
    private LocalDate dataDate;

    @Column(name = "is_active", nullable = false)
    private Boolean isActive = Boolean.TRUE;

    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
