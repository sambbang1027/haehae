package com.example.backend.collectionspots;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CollectionSpotRepository extends JpaRepository<CollectionSpot, Long> {
    List<CollectionSpot> findByWasteItem(String wasteItem);
    List<CollectionSpot> findByWasteItemAndRegionCode(String wasteItem, String regionCode);

    // 위도, 경도, 행정동 코드 가 null OR 한글로 작성되어있을 시
    List<CollectionSpot> findAll();
}
