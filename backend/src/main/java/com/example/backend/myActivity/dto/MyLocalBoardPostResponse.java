package com.example.backend.myActivity.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDate;

@Builder
@AllArgsConstructor
@Getter
public class MyLocalBoardPostResponse {

    private Long postId;
    private String title;
    private String postImageUrl;
    private LocalDate createdAt;


    public MyLocalBoardPostResponse(Long postId, String title, Timestamp createdAt,  String postImageUrl){
        this.postId = postId;
        this.title = title;
        this.createdAt = createdAt.toLocalDateTime().toLocalDate();
        this.postImageUrl = postImageUrl;
    }
}
