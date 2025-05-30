package com.example.backend.dto.localBoard;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class LocalBoardListDTO {
    private String title;
    private String content;
    private String nickname;
    private Timestamp createdAt;
    private Long commentCount;

    @QueryProjection
    public LocalBoardListDTO(String title, String content, String nickname, Timestamp createdAt, Long commentCount) {
        this.title = title;
        this.content = content;
        this.nickname = nickname;
        this.createdAt = createdAt;
        this.commentCount = commentCount;
    }
}
