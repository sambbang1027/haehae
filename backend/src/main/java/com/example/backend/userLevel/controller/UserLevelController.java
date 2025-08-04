package com.example.backend.userLevel.controller;

import com.example.backend.common.response.HaehaeResponse;
import com.example.backend.security.CustomUserDetails;
import com.example.backend.userLevel.dto.UserLevel;
import com.example.backend.userLevel.service.UserLevelService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RequestMapping("/api/level")
@RestController
public class UserLevelController {

    private final UserLevelService userLevelService;

    @GetMapping("/user/info")
    public ResponseEntity<HaehaeResponse<UserLevel>> getUserLevelInfo
            (@AuthenticationPrincipal CustomUserDetails userDetails){
        UserLevel response =  userLevelService.getUserLevelInfo(userDetails.getId());

        return ResponseEntity.ok(HaehaeResponse.ok(response));
    }
}
