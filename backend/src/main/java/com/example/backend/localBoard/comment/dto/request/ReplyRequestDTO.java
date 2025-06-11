package com.example.backend.localBoard.comment.dto.request;

import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ReplyRequestDTO {

    private long localBoardId;
    private long userId;
    private Long parentCommentId;
    private String content;
}
