package com.example.backend.localBoard.comment.service;

import com.example.backend.localBoard.comment.dto.request.CommentRequestDTO;
import com.example.backend.localBoard.comment.dto.request.ReplyRequestDTO;
import com.example.backend.localBoard.comment.dto.request.UpdateCommentRequestDTO;

public interface CommentCommandService {
    public void createComment(CommentRequestDTO commentRequestDTO);

    public void modifyComment(UpdateCommentRequestDTO updateCommentRequestDTO);

    public void deleteComment(Long commentId,Long userId);

    public void createChildComment(ReplyRequestDTO replyRequestDTO);
}
