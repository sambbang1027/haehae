package com.example.backend.localBoard.image.repository;

import com.example.backend.localBoard.board.dto.response.ImageResponseDTO;

import java.util.List;

public interface BoardImageRepositoryCustom {
    List<ImageResponseDTO> getDetailImageListById(long localBoardId);

    void deleteDetailImage(long localBoardId, List<String> boardImageUrls);
}
