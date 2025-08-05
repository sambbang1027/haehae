package com.example.backend.mission.userMissionStatus.controller;

import com.example.backend.mission.userMissionStatus.service.UserMissionStatusService;
import com.example.backend.userPoint.dto.request.UserMissionSuccessRequestDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/mission/status")
public class UserMissionStatusController {

    private final UserMissionStatusService userMissionStatusService;

    public UserMissionStatusController(UserMissionStatusService userMissionStatusService) {
        this.userMissionStatusService = userMissionStatusService;
    }

    @PostMapping("check/{userId}")
    public ResponseEntity<String> checkMissionStatus(@PathVariable Long userId){
        userMissionStatusService.checkStatusUpdate(userId);
        return new ResponseEntity<>("상태 확인 및 업데이트" , HttpStatus.OK);
    }

    @PostMapping("update/{userId}")
    public ResponseEntity<String> updateStatus(@PathVariable Long userId,  @RequestBody UserMissionSuccessRequestDTO dto){
        userMissionStatusService.completeUpdateUserStatus(userId, dto);
        return new ResponseEntity<>("업데이트 성공", HttpStatus.OK);
    }

}
