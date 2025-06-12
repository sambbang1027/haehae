package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.request.CreateContentRequestDTO;
import com.example.backend.localBoard.board.dto.request.ImageRequestDTO;
import com.example.backend.localBoard.board.dto.request.UpdateContentRequestDTO;

public interface DetailCommandService {
    public void createDetail(CreateContentRequestDTO createContentRequestDTO);

    public void updateDetail(long boardId, UpdateContentRequestDTO updateContentRequestDTO);

    public void addDetailImage(ImageRequestDTO imageRequestDTO);

    public void deleteDetailImage(ImageRequestDTO imageRequestDTO);
}
