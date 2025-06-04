package com.example.backend.service.localBoard.board;

import com.example.backend.dto.localBoard.board.request.CreateContentRequestDTO;

public interface DetailCommandService {
    public void createBoardDetail(CreateContentRequestDTO createContentRequestDTO);

    public void updateBoardDetail(long boardId, CreateContentRequestDTO createContentRequestDTO);
}
