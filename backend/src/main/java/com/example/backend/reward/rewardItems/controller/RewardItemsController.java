package com.example.backend.reward.rewardItems.controller;

import com.example.backend.pagination.PageRequestDTO;
import com.example.backend.pagination.PageResponseDTO;
import com.example.backend.pagination.response.CursorPageResponse;
import com.example.backend.reward.rewardItems.dto.request.RewardItemsRequestUpdateDTO;
import com.example.backend.reward.rewardItems.dto.request.RewardRequestDTO;
import com.example.backend.reward.rewardItems.dto.response.FindRewardDetailDTO;
import com.example.backend.reward.rewardItems.dto.response.FindRewardListDTO;
import com.example.backend.entity.reward.RewardItems;
import com.example.backend.reward.rewardItems.service.RewardItemsService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reward")
public class RewardItemsController {
    private final RewardItemsService rewardItemsService;

    public RewardItemsController(RewardItemsService rewardItemsService) {
        this.rewardItemsService = rewardItemsService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> rewardItemInsert(@Valid @RequestBody RewardRequestDTO dto){
        rewardItemsService.rewardItemInsert(dto);
        return new ResponseEntity<>("리워드 상품 등록 완료", HttpStatus.OK);
    }

    @GetMapping("/list/{rewardType}")
    public ResponseEntity<CursorPageResponse<FindRewardListDTO>> findRewardItemList(
                    @PathVariable RewardItems.RewardType rewardType,
                    @RequestParam(required = false) Long cursor, @RequestParam  int limit
                    ){
        System.out.println("리워드 타입 : "+rewardType+ ", cursor : "+ cursor+", limit : "+limit);
        CursorPageResponse<FindRewardListDTO> list = rewardItemsService.findRewardItemList(rewardType, cursor, limit);
        System.out.println("체크 : " + list);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<FindRewardDetailDTO> findRewardDetail(@PathVariable long id){
        FindRewardDetailDTO dto  =  rewardItemsService.findRewardDetail(id);
        return new ResponseEntity<>(dto,HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<String> rewardItemUpdate(@Valid @RequestBody RewardItemsRequestUpdateDTO dto){
        rewardItemsService.rewardItemUpdate(dto);
        return new ResponseEntity<>("게시물이 수정되었습니다.",HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> rewardItemsDelete(@PathVariable long id){
        rewardItemsService.rewardDeleteById(id);
        return new ResponseEntity<>("게시물이 삭제되었습니다.",HttpStatus.OK);
    }
}
