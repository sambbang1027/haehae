package com.example.backend.collectionspots.repository;

import com.example.backend.entity.CollectionSpot;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CollectionSpotRepository extends JpaRepository<CollectionSpot, Long> {

    // wasteItem과 regionCode로 필터링한 결과를 반환
    List<CollectionSpot> findByWasteItemAndRegionCode(String wasteItem, String regionCode);
}
