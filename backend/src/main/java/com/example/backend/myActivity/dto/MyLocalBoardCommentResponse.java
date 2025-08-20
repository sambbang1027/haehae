package com.example.backend.myActivity.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.sql.Timestamp;
import java.time.LocalDate;

@Builder
@AllArgsConstructor
@Getter
public class MyLocalBoardCommentResponse {

    private Long commentId;
    private String comment;
    private String postTitle;
    private LocalDate createdAt;

    public MyLocalBoardCommentResponse(Long commentId, String comment, String postTitle, Timestamp createdAt){
        this.commentId = commentId;
        this.comment = comment;
        this.postTitle = postTitle;
        this.createdAt = createdAt.toLocalDateTime().toLocalDate();
    }
}
