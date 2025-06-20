package com.example.backend.sharing.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SharingDetailResponseDTO {
    private SharingCotentResponseDTO content;
    private List<SharingImageResponseDTO> images;
}
