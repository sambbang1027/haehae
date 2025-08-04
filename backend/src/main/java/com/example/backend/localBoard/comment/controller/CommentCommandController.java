package com.example.backend.localBoard.comment.controller;

import com.example.backend.localBoard.comment.dto.request.CommentRequestDTO;
import com.example.backend.localBoard.comment.dto.request.ReplyRequestDTO;
import com.example.backend.localBoard.comment.dto.request.UpdateCommentRequestDTO;
import com.example.backend.localBoard.comment.service.CommentCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("local-board")
public class CommentCommandController {

    @Autowired
    private CommentCommandService commentCommandService;

    @PostMapping("/parent-comment/create")
    public ResponseEntity createCommentRequest(@RequestBody CommentRequestDTO commentRequestDTO) {

        commentCommandService.createComment(commentRequestDTO);

        return ResponseEntity.ok().build();
    }

    @PostMapping("/child-comment/create")
    public ResponseEntity createChildCommentRequest(@RequestBody ReplyRequestDTO replyRequestDTO) {

        commentCommandService.createChildComment(replyRequestDTO);

        return ResponseEntity.ok().build();
    }

    @PutMapping("/comment/update")
    public ResponseEntity modifyCommentRequest(@RequestBody UpdateCommentRequestDTO updateCommentRequestDTO) {
        commentCommandService.modifyComment(updateCommentRequestDTO);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/comment/delete/{commentId}/{userId}")
    public ResponseEntity deleteCommentRequest(@PathVariable Long commentId, @PathVariable Long userId) {
        commentCommandService.deleteComment(commentId, userId);
        return ResponseEntity.ok().build();
    }
}
