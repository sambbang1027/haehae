package com.example.backend.localBoard.comment.dto.request;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class ReplyRequestDTO {

    private long localBoardId;
    private long userId;
    private long parentCommentId;
    private String content;

    @QueryProjection
    public ReplyRequestDTO(long localBoardId, long userId, long parentCommentId, String content) {
        this.localBoardId = localBoardId;
        this.userId = userId;
        this.parentCommentId = parentCommentId;
        this.content = content;
    }
}
