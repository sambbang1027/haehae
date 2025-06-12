package com.example.backend.localBoard.board.controller;

import com.example.backend.localBoard.board.dto.response.DetailResponseDTO;
import com.example.backend.localBoard.board.service.DetailQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/local-board")
public class DetailQueryController {

    @Autowired
    DetailQueryService detailQueryService;

    @GetMapping("/detail/query")
    public ResponseEntity<DetailResponseDTO> boardDetailResponse() {

        long localBoardId = 6L;

        return ResponseEntity.ok(detailQueryService.queryBoardDetail(localBoardId));
    }

}
