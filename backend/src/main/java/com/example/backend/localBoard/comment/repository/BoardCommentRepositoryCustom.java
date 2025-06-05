package com.example.backend.localBoard.comment.repository;

import com.example.backend.localBoard.comment.dto.response.CommentResponseDTO;

import java.util.List;

public interface BoardCommentRepositoryCustom {
    List<CommentResponseDTO> getLocalBoardDetailCommentById(long localBoardId);
}
