package com.example.backend.service.localBoard.comment;

import com.example.backend.dto.localBoard.comment.response.CommentResponseDTO;

import java.util.List;

public interface CommentQueryService {
    public List<CommentResponseDTO> getBoardComment(long localBoardId);

    public List<CommentResponseDTO> commentTree(List<CommentResponseDTO> flatComments);
}
