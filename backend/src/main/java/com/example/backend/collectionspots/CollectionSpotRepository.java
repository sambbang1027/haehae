package com.example.backend.collectionspots;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CollectionSpotRepository extends JpaRepository<CollectionSpot, Long> {
    // 특정 종류로 전체 조회
    List<CollectionSpot> findByWasteItem(String wasteItem);

    // 특정 종류 + 지역코드로 조회
    List<CollectionSpot> findByWasteItemAndRegionCode(String wasteItem, String regionCode);

    // 전체 조회 (조건 없음)
    List<CollectionSpot> findAll();

    // 지역코드만으로 필터링
    List<CollectionSpot> findByRegionCode(String regionCode);
}
