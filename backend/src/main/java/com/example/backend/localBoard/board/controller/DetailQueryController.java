package com.example.backend.localBoard.board.controller;

import com.example.backend.localBoard.board.dto.response.DetailResponseDTO;
import com.example.backend.localBoard.board.service.DetailQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/local-board")
public class DetailQueryController {

    @Autowired
    DetailQueryService detailQueryService;

    @GetMapping("/detail/query/{id}")
    public ResponseEntity<DetailResponseDTO> boardDetailResponse(@PathVariable long id) {

       //  long localBoardId = 42L;
        return ResponseEntity.ok(detailQueryService.queryBoardDetail(id));
    }

}
