package com.example.backend.localBoard.comment.repository;

import com.example.backend.entity.localBoard.Comments;
import com.example.backend.localBoard.comment.dto.request.CommentRequestDTO;
import com.example.backend.localBoard.comment.dto.request.UpdateCommentRequestDTO;
import com.example.backend.localBoard.comment.dto.response.CommentResponseDTO;

import java.util.List;

public interface BoardCommentRepositoryCustom {
    List<CommentResponseDTO> getLocalBoardDetailCommentById(long localBoardId);

    void modifyComment(UpdateCommentRequestDTO updateCommentRequestDTO);

    void deleteComment(Long commentId, Long userId);

    void commentStatusReport(Long id, Comments.CommentsStatus status);
}
