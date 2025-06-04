package com.example.backend.dto.localBoard.board.request;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UpdateContentRequestDTO {
    long userId;
    String title;
    String content;

}
