package com.example.backend.geocoding;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

public record KakaoRegionRes(List<Document> documents) {
    public record Document(
            @JsonProperty("region_type") String regionType,
            @JsonProperty("address_name") String addressName,
            @JsonProperty("region_1depth_name") String region1depthName,
            @JsonProperty("region_2depth_name") String region2depthName,
            @JsonProperty("region_3depth_name") String region3depthName,
            @JsonProperty("code") String code,
            @JsonProperty("x") double x,
            @JsonProperty("y") double y
    ) {}
}