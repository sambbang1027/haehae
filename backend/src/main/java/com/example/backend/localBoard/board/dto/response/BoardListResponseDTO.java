package com.example.backend.localBoard.board.dto.response;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

import java.sql.Timestamp;

@Getter
@Setter
public class BoardListResponseDTO {
    private long localBoardId;
    private String title;
    private String content;
    private String nickname;
    private Timestamp createdAt;
    private Long commentCount;

    @QueryProjection
    public BoardListResponseDTO(long localBoardId, String title, String content, String nickname, Timestamp createdAt, Long commentCount) {
        this.localBoardId = localBoardId;
        this.title = title;
        this.content = content;
        this.nickname = nickname;
        this.createdAt = createdAt;
        this.commentCount = commentCount;
    }
}
