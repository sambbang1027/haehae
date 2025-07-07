package com.example.backend.mission.userMissionStatus.controller;

import com.example.backend.mission.userMissionStatus.service.UserMissionStatusService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
