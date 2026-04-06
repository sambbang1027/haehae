package com.example.backend.myActivity.dto;

import com.example.backend.entity.sharing.SharingPosts;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDate;


@Getter
public class MySharingActivityResponse {

    private Long postId;
    private String title;
    private String status;
    private LocalDate createdAt;

    public MySharingActivityResponse(Long postId, String title, SharingPosts.Status status, Timestamp createdAt){
        this.postId = postId;
        this.title = title;
        this.status = status.name();
        this.createdAt = createdAt.toLocalDateTime().toLocalDate();
    }
}
