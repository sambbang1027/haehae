package com.example.backend.repository.localBoard.comment;

import com.example.backend.dto.localBoard.comment.response.CommentResponseDTO;

import java.util.List;

public interface BoardCommentRepositoryCustom {
    List<CommentResponseDTO> getLocalBoardDetailCommentById(long localBoardId);
}
