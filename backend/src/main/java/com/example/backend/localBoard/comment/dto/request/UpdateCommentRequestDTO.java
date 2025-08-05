package com.example.backend.localBoard.comment.dto.request;

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UpdateCommentRequestDTO {
    private long commentId;
    private String content;
    private long userId;
}
