package com.example.backend.collectionspots;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "collections_spots")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CollectionSpot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "collections_spot_id", nullable = false)
    private Long collectionsSpotId;

    /** 공공데이터 연번 */
    @Column(name = "source_id", nullable = false)
    private Integer sourceId;

    /** 폐기물 종류 */
    @Column(name = "waste_item", length = 50, nullable = false)
    private String wasteItem;

    /** 구분 (공공기관/공동주택 등) */
    @Column(name = "spot_type", length = 100)
    private String spotType;

    /** 지번주소 */
    @Column(name = "lot_address", length = 200, nullable = false)
    private String lotAddress;

    /** 도로명주소 */
    @Column(name = "road_address", length = 200, nullable = false)
    private String roadAddress;

    /** 건물명 */
    @Column(name = "building_name", length = 200)
    private String buildingName;

    /** 수거함 개수 */
    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    /** 설명(위치 등) */
    @Column(name = "description", length = 500)
    private String description;

    /** 이용 가능 시간 */
    @Column(name = "available_time", length = 100)
    private String availableTime;

    /** 시·군·구 또는 동 코드/명 */
    @Column(name = "region_code", length = 20)
    private String regionCode;

    /** 위도 (DECIMAL(10,7)) */
    @Column(name = "latitude", precision = 10, scale = 7)
    private BigDecimal latitude;

    /** 경도 (DECIMAL(10,7)) */
    @Column(name = "longitude", precision = 10, scale = 7)
    private BigDecimal longitude;

    /** 현황 기준일자 (DATE) */
    @Column(name = "data_date")
    private LocalDate dataDate;

    /** 활성 여부 */
    @Column(name = "is_active", nullable = false)
    private Boolean isActive;

    /** 마지막 업데이트 타임스탬프 */
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    // 위도, 경도, 10자리 행정동 코드 업데이트 하는 도메인 메서드
    public void updateGeocode(BigDecimal latitude, BigDecimal longitude, String regionCode) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.regionCode = regionCode;
    }

}
