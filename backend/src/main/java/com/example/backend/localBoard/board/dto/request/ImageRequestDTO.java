package com.example.backend.localBoard.board.dto.request;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class ImageRequestDTO {
    private long localBoardId;
    private List<String> localBoardImageUrl;
}
