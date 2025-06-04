package com.example.backend.controller.localBoard.board;

import com.example.backend.dto.localBoard.board.response.BoardListResponseDTO;
import com.example.backend.service.localBoard.board.ListQueryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/local-board") // 전체 경로 prefix
public class BoardListQueryController {

    private final ListQueryService listQueryService;

    public BoardListQueryController(ListQueryService listQueryService) {
        this.listQueryService = listQueryService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<BoardListResponseDTO>> responseBoardList() {

        Long userId = 5L;
        List<BoardListResponseDTO> posts = listQueryService.getPostList(userId);
        return ResponseEntity.ok(posts);
    }
}
