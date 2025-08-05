package com.example.backend.collectionspots;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CollectionSpotRepository extends JpaRepository<CollectionSpot, Long>, CollectionSpotRepositoryCustom {
    // 특정 종류로 전체 조회
    //List<CollectionSpot> findByWasteItem(String wasteItem);

    // 특정 종류 + 지역코드로 조회
    List<CollectionSpot> findByWasteItemAndRegionCode(String wasteItem, String regionCode);

    // 전체 조회 (조건 없음)
    //List<CollectionSpot> findAll();

    // 지역코드만으로 필터링
    List<CollectionSpot> findByRegionCode(String regionCode);

    @Query("SELECT s FROM CollectionSpot s WHERE s.regionCode LIKE CONCAT(:regionPrefix, '%')")
    List<CollectionSpot> findByRegionPrefix(@Param("regionPrefix") String regionPrefix);

    // regionCode 앞 5자리로 필터링하는 쿼리
    List<CollectionSpot> findByRegionCodeStartingWith(String regionPrefix);

    // wasteItem + regionPrefix 조합
    List<CollectionSpot> findByWasteItemAndRegionCodeStartingWith(String wasteItem, String regionPrefix);

    // Bounding Box 범위 계산 공식 적용한 거리 정렬 쿼리
    @Query(value = """
    SELECT *, (
      6371000 * acos(
        cos(radians(:lat)) * cos(radians(cs.latitude)) *
        cos(radians(cs.longitude) - radians(:lng)) +
        sin(radians(:lat)) * sin(radians(cs.latitude))
      )
    ) AS distance
    FROM collections_spots cs
    WHERE cs.latitude BETWEEN :minLat AND :maxLat
      AND cs.longitude BETWEEN :minLng AND :maxLng
      AND (:wasteItem IS NULL OR cs.waste_item = :wasteItem)
    ORDER BY distance ASC
    LIMIT :limit
""", nativeQuery = true)
    List<CollectionSpot> findSpotsInBoundingBoxSortedByDistance(
            @Param("wasteItem") String wasteItem,
            @Param("lat") double lat,
            @Param("lng") double lng,
            @Param("minLat") double minLat,
            @Param("maxLat") double maxLat,
            @Param("minLng") double minLng,
            @Param("maxLng") double maxLng,
            @Param("limit") int limit
    );

    // 거리순 정렬
    @Query(value = """
    SELECT *, (
      6371000 * acos(
        cos(radians(:lat)) * cos(radians(cs.latitude)) *
        cos(radians(cs.longitude) - radians(:lng)) +
        sin(radians(:lat)) * sin(radians(cs.latitude))
      )
    ) AS distance
    FROM collections_spots cs
    WHERE (:wasteItem IS NULL OR cs.waste_item = :wasteItem)
    ORDER BY distance ASC
    LIMIT :limit
""", nativeQuery = true)
    List<CollectionSpot> findClosestSpotsByDistance(
            @Param("wasteItem") String wasteItem,
            @Param("lat") double lat,
            @Param("lng") double lng,
            @Param("limit") int limit
    );

}
