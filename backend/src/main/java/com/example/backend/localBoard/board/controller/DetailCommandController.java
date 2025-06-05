package com.example.backend.localBoard.board.controller;

import com.example.backend.localBoard.board.dto.request.CreateContentRequestDTO;
import com.example.backend.localBoard.board.dto.request.ImageRequestDTO;
import com.example.backend.localBoard.board.dto.request.UpdateContentRequestDTO;
import com.example.backend.localBoard.board.service.DetailCommandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("local-board")
public class DetailCommandController {

    @Autowired
    DetailCommandService detailCommandService;

    @PostMapping("write")
    public ResponseEntity requestBoardDetail(@RequestBody CreateContentRequestDTO createContentRequestDTO) {

        detailCommandService.createBoardDetail(createContentRequestDTO);

        return ResponseEntity.ok().build();
    };

    @PutMapping("update/{boardId}")
    public ResponseEntity updateBoardDetail(@PathVariable long boardId, @RequestBody UpdateContentRequestDTO updateContentRequestDTO) {

        detailCommandService.updateBoardDetail(boardId, updateContentRequestDTO);

        return ResponseEntity.ok().build();
    };

    @PostMapping("add/image")
    public ResponseEntity requestBoardImage(@RequestBody ImageRequestDTO imageRequestDTO) {

        detailCommandService.addBoardImage(imageRequestDTO);

        return ResponseEntity.ok().build();
    };

    @DeleteMapping("delete/image")
    public ResponseEntity deleteBoardDetail(@RequestBody ImageRequestDTO imageRequestDTO) {

        detailCommandService.deleteBoardImage(imageRequestDTO);

        return ResponseEntity.ok().build();
    };
}
