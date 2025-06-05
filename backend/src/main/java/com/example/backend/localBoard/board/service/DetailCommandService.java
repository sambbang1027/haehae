package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.request.CreateContentRequestDTO;
import com.example.backend.localBoard.board.dto.request.ImageRequestDTO;
import com.example.backend.localBoard.board.dto.request.UpdateContentRequestDTO;

public interface DetailCommandService {
    public void createBoardDetail(CreateContentRequestDTO createContentRequestDTO);

    public void updateBoardDetail(long boardId, UpdateContentRequestDTO updateContentRequestDTO);

    public void addBoardImage(ImageRequestDTO imageRequestDTO);

    public void deleteBoardImage(ImageRequestDTO imageRequestDTO);
}
