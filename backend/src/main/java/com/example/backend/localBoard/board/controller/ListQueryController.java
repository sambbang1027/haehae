package com.example.backend.localBoard.board.controller;

import com.example.backend.localBoard.board.dto.response.BoardListResponseDTO;
import com.example.backend.localBoard.board.service.ListQueryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/local-board") // 전체 경로 prefix
public class ListQueryController {

    private final ListQueryService listQueryService;

    public ListQueryController(ListQueryService listQueryService) {
        this.listQueryService = listQueryService;
    }

    @GetMapping("/list/query")
    public ResponseEntity<List<BoardListResponseDTO>> boardListResponse() {

        Long userId = 5L;
        List<BoardListResponseDTO> posts = listQueryService.queryPostList(userId);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/list/region")
    public ResponseEntity<String> queryRegionResponse() {
        Long userId = 5L;

        String region = listQueryService.queryRegion(userId);

        return ResponseEntity.ok(region);
    }
}
