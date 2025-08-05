package com.example.backend.geocoding;

public record GeocodingResult(
        double lat,         // 위도
        double lng,         // 경도
        String regionCode   // 행정동 코드 (예: 1144011600)
) {}
