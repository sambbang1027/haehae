package com.example.backend.localBoard.comment.dto.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class CommentRequestDTO {
        long LocalBoardId;
        long userId;
        String Content;

        public CommentRequestDTO(long localBoardId, long userId, String content) {
            this.LocalBoardId = localBoardId;
            this.userId = userId;
            this.Content = content;
        }
}
