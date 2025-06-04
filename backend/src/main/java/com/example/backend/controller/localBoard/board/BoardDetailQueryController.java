package com.example.backend.controller.localBoard.board;

import com.example.backend.dto.localBoard.board.response.DetailResponseDTO;
import com.example.backend.service.localBoard.board.DetailQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/local-board")
public class BoardDetailQueryController {

    @Autowired
    DetailQueryService detailQueryService;

    @GetMapping("/detail")
    public ResponseEntity<DetailResponseDTO> responseBoardDetail() {

        long localBoardId = 6L;

        return ResponseEntity.ok(detailQueryService.getBoardDetail(localBoardId));
    }
}
