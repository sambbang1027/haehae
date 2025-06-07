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

    @PostMapping("detail/create")
    public ResponseEntity createDetailRequest(@RequestBody CreateContentRequestDTO createContentRequestDTO) {

        detailCommandService.createDetail(createContentRequestDTO);

        return ResponseEntity.ok().build();
    };

    @PutMapping("detail/update/{boardId}")
    public ResponseEntity updateDetailRequest(@PathVariable long boardId, @RequestBody UpdateContentRequestDTO updateContentRequestDTO) {

        detailCommandService.updateDetail(boardId, updateContentRequestDTO);

        return ResponseEntity.ok().build();
    };

    @PostMapping("image/add")
    public ResponseEntity detailImageRequest(@RequestBody ImageRequestDTO imageRequestDTO) {

        detailCommandService.addDetailImage(imageRequestDTO);

        return ResponseEntity.ok().build();
    };

    @DeleteMapping("image/delete")
    public ResponseEntity deleteDetailRequest(@RequestBody ImageRequestDTO imageRequestDTO) {

        detailCommandService.deleteDetailImage(imageRequestDTO);

        return ResponseEntity.ok().build();
    };
}
