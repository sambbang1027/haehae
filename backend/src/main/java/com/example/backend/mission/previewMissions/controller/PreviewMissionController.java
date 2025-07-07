package com.example.backend.mission.previewMissions.controller;

import com.example.backend.mission.previewMissions.dto.response.PreviewMissionListResponseDTO;
import com.example.backend.mission.previewMissions.service.PreviewMissionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/previewMission")
public class PreviewMissionController {

    private final PreviewMissionService previewMissionService;

    public PreviewMissionController(PreviewMissionService previewMissionService) {
        this.previewMissionService = previewMissionService;
    }

    @GetMapping("/list")
    public ResponseEntity<List<PreviewMissionListResponseDTO>> findAllActiveMission(){
        System.out.println("요청 들어옴");
        List<PreviewMissionListResponseDTO> missionList= previewMissionService.findPreviewALlActive();
        System.out.println("반환값 확인 : "+ missionList);
        return new ResponseEntity<>(missionList, HttpStatus.OK);
    }



}
