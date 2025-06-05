package com.example.backend.localBoard.comment.dto.response;


import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
public class CommentResponseDTO {
    long userId;
    String nickname;
    String profileImageUrl;

    long commentId;
    Long parentCommentId;
    String content;
    Timestamp createdAt;

    List<CommentResponseDTO> replies = new ArrayList<CommentResponseDTO>();

    @QueryProjection
    public CommentResponseDTO(long userId, String nickname, String profileImageUrl, long commentId, Long parentCommentId, String content, Timestamp createdAt) {
        this.userId = userId;
        this.nickname = nickname;
        this.profileImageUrl = profileImageUrl;
        this.commentId = commentId;
        this.parentCommentId = parentCommentId;
        this.content = content;
        this.createdAt = createdAt;
    }
}
