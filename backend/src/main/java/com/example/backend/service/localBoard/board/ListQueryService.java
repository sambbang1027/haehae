package com.example.backend.service.localBoard.board;

import com.example.backend.dto.localBoard.board.response.BoardListResponseDTO;

import java.util.List;


public interface ListQueryService {
    public List<BoardListResponseDTO> getPostList(Long userId);
}
