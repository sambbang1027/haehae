package com.example.backend.controller.localBoard.board;

import com.example.backend.dto.localBoard.board.request.CreateContentRequestDTO;
import com.example.backend.service.localBoard.board.DetailCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("local-board")
public class BoardDetailCommandController {

    @Autowired
    DetailCommandService detailCommandService;

    @PostMapping("write")
    public ResponseEntity requestBoardDetail(@RequestBody CreateContentRequestDTO createContentRequestDTO) {

        detailCommandService.createBoardDetail(createContentRequestDTO);

        return ResponseEntity.ok().build();
    };

    @PutMapping("update/{boardId}")
    public ResponseEntity updateBoardDetail(@PathVariable long boardId, @RequestBody CreateContentRequestDTO createContentRequestDTO) {

        detailCommandService.updateBoardDetail(boardId, createContentRequestDTO);

        return ResponseEntity.ok().build();
    };

    @DeleteMapping
    public ResponseEntity deleteBoardDetail(@RequestBody CreateContentRequestDTO createContentRequestDTO) {

        return ResponseEntity.ok().build();
    };
}
