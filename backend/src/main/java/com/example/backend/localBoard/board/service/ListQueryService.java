package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.response.BoardListResponseDTO;

import java.util.List;


public interface ListQueryService {
    public List<BoardListResponseDTO> getPostList(Long userId);
}
