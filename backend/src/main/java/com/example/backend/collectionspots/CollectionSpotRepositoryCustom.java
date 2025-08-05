package com.example.backend.collectionspots;

import java.util.List;

public interface CollectionSpotRepositoryCustom {
    List<CollectionSpot> findNearbySpots(String wasteItem, double lat, double lng, double radiusInMeters);
}
