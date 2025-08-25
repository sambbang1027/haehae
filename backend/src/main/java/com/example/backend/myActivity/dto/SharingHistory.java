package com.example.backend.myActivity.dto;


import java.time.LocalDateTime;


public interface SharingHistory {
    Long getHistoryId();
    String getTitle();
    LocalDateTime getCreatedAt();
    String getStatusType();
}
