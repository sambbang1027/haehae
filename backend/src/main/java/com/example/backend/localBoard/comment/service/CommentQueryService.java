package com.example.backend.localBoard.comment.service;

import com.example.backend.localBoard.comment.dto.response.CommentResponseDTO;

import java.util.List;

public interface CommentQueryService {
    public List<CommentResponseDTO> queryBoardComment(long localBoardId);

    public List<CommentResponseDTO> commentTree(List<CommentResponseDTO> flatComments);
}
