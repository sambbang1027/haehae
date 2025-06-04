package com.example.backend.service.localBoard.comment;

import com.example.backend.dto.localBoard.comment.response.CommentResponseDTO;
import com.example.backend.repository.localBoard.comment.BoardCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommentQueryServiceImpl implements CommentQueryService {

    @Autowired
    BoardCommentRepository boardCommentRepository;

    @Override
    public List<CommentResponseDTO> getBoardComment(long localBoardId) {
        List<CommentResponseDTO> flatComments = boardCommentRepository.getLocalBoardDetailCommentById(localBoardId);
        List<CommentResponseDTO> comments = commentTree(flatComments);
        return comments;
    }

    @Override
    public List<CommentResponseDTO> commentTree(List<CommentResponseDTO> flatComments) {

        List<CommentResponseDTO> returnComments = new ArrayList<>();
        Map<Long, CommentResponseDTO> commentMap = new HashMap<>();

        for (CommentResponseDTO comment : flatComments) {
            commentMap.put(comment.getCommentId(), comment);
        }

        for (CommentResponseDTO comment : flatComments) {
            if (comment.getParentCommentId() == null) {
                returnComments.add(comment);
            } else {
                CommentResponseDTO parentComment = commentMap.get(comment.getParentCommentId());
                if (parentComment != null) {
                    parentComment.getReplies().add(comment);
                }
            }
        }

        return returnComments;
    }
}

