package com.example.backend.repository.localBoard.image;

import com.example.backend.dto.localBoard.board.response.ImageResponseDTO;

import java.util.List;

public interface BoardImageRepositoryCustom {
    List<ImageResponseDTO> getLocalBoardDetailImageById(long localBoardId);
}
