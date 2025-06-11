package com.example.backend.localBoard.board.service;

import com.example.backend.localBoard.board.dto.response.DetailResponseDTO;

public interface DetailQueryService {
    public DetailResponseDTO queryBoardDetail(long LocalBoardId);

}
