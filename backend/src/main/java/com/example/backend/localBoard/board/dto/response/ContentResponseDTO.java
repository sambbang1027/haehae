package com.example.backend.localBoard.board.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.sql.Timestamp;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class ContentResponseDTO {
    private long userId;
    private String nickname;
    private long localBoardId;
    private String title;
    private String content;
    private Timestamp createdAt;

    @QueryProjection
    public ContentResponseDTO(long userId, String nickname, long localBoardId, String title, String content, Timestamp createdAt) {
        this.userId = userId;
        this.nickname = nickname;
        this.localBoardId = localBoardId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
    }
}
