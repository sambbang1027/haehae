package com.example.backend.localBoard.comment.controller;

import com.example.backend.localBoard.comment.dto.response.CommentResponseDTO;
import com.example.backend.localBoard.comment.service.CommentQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("local-board")
public class CommentQueryController {

    @Autowired
    private CommentQueryService commentQueryService;

    @GetMapping("/comment")
    public ResponseEntity<List<CommentResponseDTO>> BoardCommentResponse(){

        long localBoardId = 6L;

        List<CommentResponseDTO> comments = commentQueryService.queryBoardComment(localBoardId);

        return ResponseEntity.ok(comments);
    }
}
