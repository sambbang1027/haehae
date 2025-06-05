package com.example.backend.localBoard.board.dto.request;

import lombok.*;

import java.sql.Timestamp;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class UpdateContentRequestDTO {
    long userId;
    String title;
    String content;
    Timestamp updateAt;
}
