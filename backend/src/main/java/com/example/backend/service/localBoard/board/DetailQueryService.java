package com.example.backend.service.localBoard.board;

import com.example.backend.dto.localBoard.board.response.DetailResponseDTO;

public interface DetailQueryService {
    public DetailResponseDTO getBoardDetail(long LocalBoardId);

//    public List<CommentResponseDTO> commentTree(List<CommentResponseDTO> flatComments);
}
