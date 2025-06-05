package com.example.backend.reward.rewardItmeImages.controller;

import com.example.backend.reward.rewardItmeImages.service.RewardItemImagesService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reward/images")
public class RewardItemImagesController {
    private final RewardItemImagesService rewardItemImagesService;

    public RewardItemImagesController(RewardItemImagesService rewardItemImagesService) {
        this.rewardItemImagesService = rewardItemImagesService;
    }



}
