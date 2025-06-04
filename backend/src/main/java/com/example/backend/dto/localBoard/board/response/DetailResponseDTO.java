package com.example.backend.dto.localBoard.board.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class DetailResponseDTO {
    ContentResponseDTO content;
    List<ImageResponseDTO> images;
}
