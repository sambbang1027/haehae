package com.example.backend.localBoard.comment.service;

import com.example.backend.entity.localBoard.Comments;
import com.example.backend.localBoard.comment.dto.request.CommentRequestDTO;
import com.example.backend.localBoard.comment.dto.request.ReplyRequestDTO;
import com.example.backend.localBoard.comment.dto.request.UpdateCommentRequestDTO;
import com.example.backend.localBoard.comment.repository.BoardCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CommentCommandServiceImpl implements CommentCommandService {

    @Autowired
    BoardCommentRepository boardCommentRepository;

    @Override
    public void createComment(CommentRequestDTO commentRequestDTO) {

        Comments comments = Comments.builder()
                .localBoardId(commentRequestDTO.getLocalBoardId())
                .userId(commentRequestDTO.getUserId())
                .content(commentRequestDTO.getContent())
                .build();
                ;

        boardCommentRepository.save(comments);
    }

    @Override
    public void modifyComment(UpdateCommentRequestDTO updateCommentRequestDTO) {
        boardCommentRepository.modifyComment(updateCommentRequestDTO);
    };

    @Override
    public void deleteComment(Long commentId) {
        boardCommentRepository.deleteComment(commentId);
    }

    @Override
    public void createChildComment(ReplyRequestDTO replyRequestDTO) {
        System.out.println("🔥 createChildComment() 들어옴!!");

        System.out.println("🔥 DTO 값 확인:");
        System.out.println("localBoardId: " + replyRequestDTO.getLocalBoardId());
        System.out.println("userId: " + replyRequestDTO.getUserId());
        System.out.println("parentCommentId: " + replyRequestDTO.getParentCommentId());
        System.out.println("content: " + replyRequestDTO.getContent());

        Comments comments = Comments
                .builder()
                .localBoardId(replyRequestDTO.getLocalBoardId())
                .userId(replyRequestDTO.getUserId())
                .parentCommentId(replyRequestDTO.getParentCommentId())
                .content(replyRequestDTO.getContent())
                .build();


        boardCommentRepository.save(comments);
    }
}
