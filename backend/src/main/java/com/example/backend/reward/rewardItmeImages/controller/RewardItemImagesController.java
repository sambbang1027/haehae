package com.example.backend.reward.rewardItmeImages.controller;

import com.example.backend.reward.rewardItmeImages.dto.request.RewardImagesUpdateDTO;
import com.example.backend.reward.rewardItmeImages.service.RewardItemImagesService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reward/images")
public class RewardItemImagesController {
    private final RewardItemImagesService rewardItemImagesService;

    public RewardItemImagesController(RewardItemImagesService rewardItemImagesService) {
        this.rewardItemImagesService = rewardItemImagesService;
    }

    @PostMapping("/insert")
    public ResponseEntity<String> rewardImageInsertAndUpdates(@Valid @RequestBody List<RewardImagesUpdateDTO> dtoList){
        rewardItemImagesService.rewardItemImagesUpdate(dtoList);
        return new ResponseEntity<>("이미지 추가 완료", HttpStatus.OK);
    }

    @DeleteMapping("/delete/{ids}")
    public ResponseEntity<String> rewardImageDelete(@PathVariable String ids){
        rewardItemImagesService.rewardItemImagesDelete(ids);
        return new ResponseEntity<>("이미지 삭제 완료",HttpStatus.OK);
    }

    @DeleteMapping("/deleteAll/{id}")
    public ResponseEntity<String> rewardItemImagesDeleteAll(@PathVariable long id){
        rewardItemImagesService.rewardItemIamgeDeleteAll(id);
        return new ResponseEntity<>("이미지 전체 삭제 완료",HttpStatus.OK);
    }



}
