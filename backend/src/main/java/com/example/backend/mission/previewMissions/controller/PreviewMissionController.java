package com.example.backend.mission.previewMissions.controller;

import com.example.backend.entity.user.UserLevel;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListAndUserStatusDTO;
import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;
import com.example.backend.mission.previewMissions.service.PreviewMissionService;
import com.example.backend.user.dto.TotalAndLevelDTO;
import com.example.backend.user.dto.UserInfoAndNextLevelInfoDTO;
import com.example.backend.user.service.UserInfoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/previewMission")
public class PreviewMissionController {

    private final PreviewMissionService previewMissionService;
    private final UserInfoService userInfoService;

    public PreviewMissionController(PreviewMissionService previewMissionService, UserInfoService userInfoService) {
        this.previewMissionService = previewMissionService;
        this.userInfoService = userInfoService;
    }

    // 클라이언트 용 미션 리스트
    @GetMapping("/user/list/{userId}")
    public ResponseEntity<List<PreviewMissionListAndUserStatusDTO>> findAllActiveMissionAndUserState(
            @PathVariable Long userId
    ){
        List<PreviewMissionListAndUserStatusDTO> missionList = previewMissionService.userPreviewMissionAndStatus(userId);
        return new ResponseEntity<>(missionList, HttpStatus.OK);
    }

    //클라이언트 현재포인트, 총 포인트, 등급
    @GetMapping("/user/{userId}")
    public ResponseEntity<UserInfoAndNextLevelInfoDTO> userPointAndLevel(@PathVariable Long userId){
        UserInfoAndNextLevelInfoDTO dto = userInfoService.findCurrentAndTotalPointByUserId(userId);
        return new ResponseEntity<>(dto, HttpStatus.OK);
    }
}
